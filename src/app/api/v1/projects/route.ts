import { db, admin } from "@/lib/firebase-admin";
import { verifyAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");

    let query: admin.firestore.Query = db
      .collection("projects")
      .orderBy("createdAt", "desc");

    if (featured === "true") {
      query = query.where("isFeatured", "==", true);
    }

    const snapshot = await query.get();
    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const user = await verifyAuth(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const project = await req.json();
    project.createdAt = admin.firestore.FieldValue.serverTimestamp();
    const docRef = await db.collection("projects").add(project);
    return NextResponse.json({ id: docRef.id, ...project }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
