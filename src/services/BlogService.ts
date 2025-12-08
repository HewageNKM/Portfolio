import { db } from "@/lib/firebase-admin";

export class BlogService {
  static async getBlogs(page: number = 1, limit: number = 9) {
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

    return {
      data: blogs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async getBlogById(id: string) {
    const doc = await db.collection("blogs").doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  static async createBlog(blog: any) {
    if (!blog.date) {
      blog.date = new Date().toISOString();
    }
    const docRef = await db.collection("blogs").add(blog);
    return { id: docRef.id, ...blog };
  }
}
