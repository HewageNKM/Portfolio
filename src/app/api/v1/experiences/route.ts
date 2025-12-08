import { verifyAuth } from "@/services/AuthService";
import { ExperienceService } from "@/services/ExperienceService";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const experiences = await ExperienceService.getExperiences();
    return NextResponse.json(experiences);
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
    const result = await ExperienceService.createExperience(data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
