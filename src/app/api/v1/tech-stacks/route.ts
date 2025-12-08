import { verifyAuth } from "@/services/AuthService";
import { TechStackService } from "@/services/TechStackService";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const stacks = await TechStackService.getTechStacks();
    return NextResponse.json(stacks);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const user = await verifyAuth(req);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  try {
    const data = await req.json();
    const result = await TechStackService.createTechStack(data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
