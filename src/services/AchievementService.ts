import { db, admin } from "@/lib/firebase-admin";

export class AchievementService {
  private static formatDate(date: any) {
    if (!date) return null;
    return new Date(date).toLocaleString();
  }

  static async getAchievements() {
    const snapshot = await db
      .collection("achievements")
      .orderBy("date", "desc")
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

  static async getAchievementById(id: string) {
    const doc = await db.collection("achievements").doc(id).get();
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

  static async createAchievement(achievement: any) {
    const data = {
      ...achievement,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const docRef = await db.collection("achievements").add(data);
    return {
      id: docRef.id,
      ...achievement,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };
  }

  static async updateAchievement(id: string, achievement: any) {
    delete achievement.createdAt;
    const data = {
      ...achievement,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    await db.collection("achievements").doc(id).update(data);
    return {
      id,
      ...achievement,
      updatedAt: new Date().toLocaleString(),
    };
  }

  static async deleteAchievement(id: string) {
    await db.collection("achievements").doc(id).delete();
  }
}
