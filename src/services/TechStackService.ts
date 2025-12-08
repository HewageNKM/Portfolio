import { db, admin } from "@/lib/firebase-admin";

export class TechStackService {
  private static formatDate(date: any) {
    if (!date) return null;
    return new Date(date).toLocaleString();
  }

  static async getTechStacks() {
    const snapshot = await db
      .collection("techStacks")
      .orderBy("name", "asc")
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

  static async getTechStackById(id: string) {
    const doc = await db.collection("techStacks").doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data()!;
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
  }

  static async createTechStack(techStack: any) {
    const data = {
      ...techStack,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const docRef = await db.collection("techStacks").add(data);
    return {
      id: docRef.id,
      ...techStack,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };
  }

  static async updateTechStack(id: string, techStack: any) {
    delete techStack.createdAt;
    const data = {
      ...techStack,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    await db.collection("techStacks").doc(id).update(data);
    return {
      id,
      ...techStack,
      updatedAt: new Date().toLocaleString(),
    };
  }

  static async deleteTechStack(id: string) {
    await db.collection("techStacks").doc(id).delete();
  }
}
