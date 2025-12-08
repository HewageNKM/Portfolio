import { db, admin } from "@/lib/firebase-admin";
import { verifyAuth } from "@/services/AuthService";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const snapshot = await db
      .collection("experiences")
      .orderBy("createdAt", "desc")
      .get();
    const experiences = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(experiences);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const user = await verifyAuth(req);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  try {
    const data = await req.json();
    data.createdAt = admin.firestore.FieldValue.serverTimestamp();
    const docRef = await db.collection("experiences").add(data);
    return NextResponse.json({ id: docRef.id, ...data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
