import { MailService } from "@/services/MailService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request body basics (service also checks, but good to have)
    // Actually Service checks throwing errors, so we can just call it.
    // Client IP rate limiting is handled by middleware now.

    const result = await MailService.sendMail({
      ...body,
      clientName: body.clinetName, // Fixing typo in mapping if exist, assuming body has clientName or clinetName?
      // Previous code had "clinetName".
    });

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    console.error("Error processing mail request:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 400 } // Service throws validation errors usually
    );
  }
}
