import { verifyAuth } from "@/services/AuthService";
import { AIService } from "@/services/AIService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await verifyAuth(req);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  try {
    const { prompt, repoUrl } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const text = await AIService.generateProjectContent(prompt, repoUrl);
    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
