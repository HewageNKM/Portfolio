import { verifyAuth } from "@/services/AuthService";
import { ProjectService } from "@/services/ProjectService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // The service currently fetches all. Filtering by feature can be added to service if needed.
    // For now, fetching all and filtering here or updating service.
    // The previous code filtered 'featured' in the query.
    // Let's assume getProjects returns all and we filter, or ideally update service to accept filters.
    // Given the task is strict separation, I will use the service as is for now or update it slightly if I can't filter.
    // However, the service I created: static async getProjects() { ... } returns all.
    // I'll update the service to support filtering? Or just filter the result?
    // Filtering result is easier for now to maintain behavior without changing service signature too much.
    // Actually, checking ProjectService content again: it just gets all orderBy createdAt.
    // "featured" filter was: if (featured === "true") query = query.where("isFeatured", "==", true);

    // I will stick to the service call. If functionality is lost (filtering), I should update the service.
    // Let's update ProjectService to accept filters in a future step if strictly needed,
    // but for now I'll just get all projects.
    // Wait, the client might rely on filtering.
    // Let's try to pass the filter to the service? No, the service I wrote doesn't take args.
    // I'll filter in memory for now to keep it simple, or just return all (the UI likely filters too?).
    // Actually, looking at the previous code, it filters at DB level.
    // To match behavior, I should probably update ProjectService.ts to take a 'featured' arg.
    // But I can't edit ProjectService in this turn easily without another tool call.
    // I will refactor to use the service, and if I need to filter, I'll do it in memory since the dataset is likely small (projects).

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
