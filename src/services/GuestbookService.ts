import { auth, db } from "@/lib/firebase-admin";

export const GuestbookService = {
  async createEntry(token: string, message: string) {
    // 1. Verify Token
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(token);
    } catch (error) {
      throw new Error("Unauthorized");
    }

    // 2. Validate Message
    if (!message || typeof message !== "string" || !message.trim()) {
      throw new Error("Invalid message");
    }

    if (message.length > 500) {
      throw new Error("Message too long");
    }

    // 3. Create Entry Object
    const newMessage = {
      name: decodedToken.name || "Anonymous",
      photoURL: decodedToken.picture || "",
      message: message.trim(),
      userId: decodedToken.uid,
      createdAt: new Date(),
      isVisible: true,
    };

    // 4. Save to Firestore
    const docRef = await db.collection("guestbook").add(newMessage);

    return { id: docRef.id, ...newMessage };
  },
};
