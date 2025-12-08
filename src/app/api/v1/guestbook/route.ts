import { NextRequest, NextResponse } from "next/server";
import { GuestbookService } from "@/services/GuestbookService";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    const { message } = await req.json();

    const result = await GuestbookService.createEntry(token, message);

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error("Guestbook API Error:", error);

    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (
      error.message === "Invalid message" ||
      error.message === "Message too long"
    ) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
