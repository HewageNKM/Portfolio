import { NextResponse } from "next/server";
import { getAnalyticsData } from "@/services/AnalyticsService";

export async function GET() {
  try {
    const data = await getAnalyticsData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
