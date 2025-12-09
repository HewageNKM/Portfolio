import { db, admin } from "@/lib/firebase-admin";

export class ServicesService {
  private static formatDate(date: any) {
    if (!date) return null;
    return new Date(date).toLocaleString();
  }

  static async getServices() {
    const snapshot = await db
      .collection("services")
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

  static async getServiceById(id: string) {
    const doc = await db.collection("services").doc(id).get();
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

  static async createService(service: any) {
    const data = {
      ...service,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const docRef = await db.collection("services").add(data);
    return {
      id: docRef.id,
      ...service,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };
  }

  static async updateService(id: string, service: any) {
    delete service.createdAt; // Prevent updating createdAt
    const data = {
      ...service,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    await db.collection("services").doc(id).update(data);
    return {
      id,
      ...service,
      updatedAt: new Date().toLocaleString(),
    };
  }

  static async deleteService(id: string) {
    await db.collection("services").doc(id).delete();
  }
}
