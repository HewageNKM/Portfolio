import { NextRequest, NextResponse } from "next/server";
import { getAnalyticsTrend } from "@/services/AnalyticsService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const range = searchParams.get("range") || "30days";
    const data = await getAnalyticsTrend(range);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
