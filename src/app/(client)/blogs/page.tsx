import { Metadata } from "next";
import { BlogService } from "@/services/BlogService";
import BlogsClient from "./BlogsClient";

export const metadata: Metadata = {
  title: "Blogs | NKM Hewage",
  description:
    "Read insightful articles and updates by Nadun Malwenna on technology, coding, and software development.",
  openGraph: {
    title: "Blogs | NKM Hewage",
    description: "Insights and articles by Nadun Malwenna.",
    url: "https://hewagenkm.com/blogs",
    images: ["https://hewagenkm.com/og-blogs.png"],
    type: "website",
  },
};

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1", 10);
  const { data, totalPages } = await BlogService.getBlogs(page, 9); // Limit 9 as in original

  return (
    <BlogsClient
      initialBlogs={data.map((b: any) => ({
        id: b.id,
        title: b.title,
        summary: b.summary,
        date: b.createdAt || "", // Use formatted createdAt from service
        tags: b.tags,
      }))}
      totalPages={totalPages}
      currentPage={page}
    />
  );
}
