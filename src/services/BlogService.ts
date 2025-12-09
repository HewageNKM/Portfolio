import { db, admin } from "@/lib/firebase-admin";

export class BlogService {
  private static formatDate(date: any) {
    if (!date) return null;
    return new Date(date).toLocaleString();
  }

  static async getBlogs(page: number = 1, limit: number = 9, search?: string) {
    const blogsCollection = db.collection("blogs");

    // If search is provided, we need to fetch all and filter in memory
    // Firestore doesn't support native full-text search
    if (search) {
      const snapshot = await blogsCollection.orderBy("date", "desc").get();
      const allBlogs = snapshot.docs.map((doc) => {
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

      const searchLower = search.toLowerCase();
      const filteredBlogs = allBlogs.filter((blog: any) => {
        return (
          blog.title?.toLowerCase().includes(searchLower) ||
          blog.summary?.toLowerCase().includes(searchLower) ||
          blog.tags?.some((tag: string) =>
            tag.toLowerCase().includes(searchLower)
          )
        );
      });

      const total = filteredBlogs.length;
      const totalPages = Math.ceil(total / limit);
      const offset = (page - 1) * limit;
      const paginatedBlogs = filteredBlogs.slice(offset, offset + limit);

      return {
        data: paginatedBlogs,
        total,
        page,
        limit,
        totalPages,
      };
    }

    const offset = (page - 1) * limit;

    // Get total count
    const countSnapshot = await blogsCollection.count().get();
    const total = countSnapshot.data().count;

    const snapshot = await blogsCollection
      .orderBy("date", "desc")
      .limit(limit)
      .offset(offset)
      .get();

    const blogs = snapshot.docs.map((doc) => {
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

  static async createBlog(blog: any) {
    if (!blog.date) {
      blog.date = new Date().toISOString();
    }
    const data = {
      ...blog,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const docRef = await db.collection("blogs").add(data);
    return {
      id: docRef.id,
      ...blog,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };
  }

  static async updateBlog(id: string, blog: any) {
    delete blog.createdAt;
    const data = {
      ...blog,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    await db.collection("blogs").doc(id).update(data);
    return {
      id,
      ...blog,
      updatedAt: new Date().toLocaleString(),
    };
  }

  static async deleteBlog(id: string) {
    await db.collection("blogs").doc(id).delete();
  }
}
