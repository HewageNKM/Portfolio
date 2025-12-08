import { db } from "@/lib/firebase-admin";

export class DashboardService {
  static async getStats() {
    const [blogs, projects, educations, achievements, techStacks, experiences] =
      await Promise.all([
        db.collection("blogs").count().get(),
        db.collection("projects").count().get(),
        db.collection("educations").count().get(),
        db.collection("achievements").count().get(),
        db.collection("techStacks").count().get(),
        db.collection("experiences").count().get(),
      ]);

    return {
      blogs: blogs.data().count,
      projects: projects.data().count,
      education: educations.data().count,
      achievements: achievements.data().count,
      techStacks: techStacks.data().count,
      experiences: experiences.data().count,
    };
  }
}
