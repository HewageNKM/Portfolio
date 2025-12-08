import { db } from "@/lib/firebase-admin";
import { verifyAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");
    const offset = (page - 1) * limit;

    const blogsCollection = db.collection("blogs");

    // Get total count
    const countSnapshot = await blogsCollection.count().get();
    const total = countSnapshot.data().count;

    const snapshot = await blogsCollection
      .orderBy("date", "desc")
      .limit(limit)
      .offset(offset)
      .get();

    const blogs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({
      data: blogs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
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
    const blog = await req.json();
    if (!blog.date) {
      blog.date = new Date().toISOString();
    }
    const docRef = await db.collection("blogs").add(blog);
    return NextResponse.json({ id: docRef.id, ...blog }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
