import { db } from "@/lib/firebase-admin";

export class ProjectService {
  static async getProjects() {
    const snapshot = await db
      .collection("projects")
      .orderBy("createdAt", "desc")
      .get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  static async createProject(project: any) {
    const docRef = await db.collection("projects").add({
      ...project,
      createdAt: new Date().toISOString(),
    });
    return { id: docRef.id, ...project };
  }
}
