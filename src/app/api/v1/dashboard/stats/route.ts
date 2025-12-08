import { NextResponse } from "next/server";
import { DashboardService } from "@/services/DashboardService";

export async function GET() {
  try {
    const stats = await DashboardService.getStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
