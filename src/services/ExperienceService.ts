import { db, admin } from "@/lib/firebase-admin";

export class ExperienceService {
  private static formatDate(date: any) {
    if (!date) return null;
    return new Date(date).toLocaleString();
  }

  static async getExperiences() {
    const snapshot = await db
      .collection("experiences")
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

  static async getExperienceById(id: string) {
    const doc = await db.collection("experiences").doc(id).get();
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

  static async createExperience(experience: any) {
    const data = {
      ...experience,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const docRef = await db.collection("experiences").add(data);
    return {
      id: docRef.id,
      ...experience,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };
  }

  static async updateExperience(id: string, experience: any) {
    delete experience.createdAt;
    const data = {
      ...experience,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    await db.collection("experiences").doc(id).update(data);
    return {
      id,
      ...experience,
      updatedAt: new Date().toLocaleString(),
    };
  }

  static async deleteExperience(id: string) {
    await db.collection("experiences").doc(id).delete();
  }
}
