import { db, admin } from "@/lib/firebase-admin";

export class ProjectService {
  private static formatDate(date: any) {
    if (!date) return null;
    return new Date(date).toLocaleString();
  }

  static async getProjects() {
    const snapshot = await db
      .collection("projects")
      .orderBy("createdAt", "desc")
      .get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: this.formatDate(
          data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt
        ),
        updatedAt: this.formatDate(
          data.updatedAt?.toDate ? data.updatedAt.toDate() : data.updatedAt
        ),
      };
    });
  }

  static async createProject(project: any) {
    const data = {
      ...project,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const docRef = await db.collection("projects").add(data);
    return {
      id: docRef.id,
      ...project,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };
  }

  static async updateProject(id: string, project: any) {
    delete project.createdAt; // Prevent modifying createdAt
    const data = {
      ...project,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    await db.collection("projects").doc(id).update(data);
    return {
      id,
      ...project,
      updatedAt: new Date().toLocaleString(),
    };
  }

  static async deleteProject(id: string) {
    await db.collection("projects").doc(id).delete();
  }
}
