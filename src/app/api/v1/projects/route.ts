import { verifyAuth } from "@/services/AuthService";
import { ProjectService } from "@/services/ProjectService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const projects = await ProjectService.getProjects();
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");

    let filteredProjects = projects;
    if (featured === "true") {
      filteredProjects = projects.filter((p: any) => p.isFeatured === true);
    }

    return NextResponse.json(filteredProjects);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const user = await verifyAuth(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const project = await req.json();
    const result = await ProjectService.createProject(project);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
