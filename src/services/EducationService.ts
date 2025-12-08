import { db, admin } from "@/lib/firebase-admin";

export class EducationService {
  private static formatDate(date: any) {
    if (!date) return null;
    return new Date(date).toLocaleString();
  }

  static async getEducations() {
    const snapshot = await db
      .collection("educations")
      .orderBy("startDate", "desc")
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

  static async getEducationById(id: string) {
    const doc = await db.collection("educations").doc(id).get();
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

  static async createEducation(education: any) {
    const data = {
      ...education,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const docRef = await db.collection("educations").add(data);
    return {
      id: docRef.id,
      ...education,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };
  }

  static async updateEducation(id: string, education: any) {
    delete education.createdAt;
    const data = {
      ...education,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    await db.collection("educations").doc(id).update(data);
    return {
      id,
      ...education,
      updatedAt: new Date().toLocaleString(),
    };
  }

  static async deleteEducation(id: string) {
    await db.collection("educations").doc(id).delete();
  }
}
