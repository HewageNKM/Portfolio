import { NextResponse } from "next/server";
import { GithubService } from "@/services/GithubService";

export async function GET() {
  try {
    const stats = await GithubService.getStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error in Github Stats API:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub stats" },
      { status: 500 }
    );
  }
}
