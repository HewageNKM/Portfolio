import { Metadata, ResolvingMetadata } from "next";
import BlogClient from "./BlogClient";
import { notFound } from "next/navigation";
import { BlogService } from "@/services/BlogService";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const blog = (await BlogService.getBlogById(id)) as any;

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];
  const ogImage =
    (blog.content.match(/<img[^>]+src="([^">]+)"/) || [])[1] ||
    "https://hewagenkm.com/og-blogs.webp";

  return {
    title: `${blog.title} | NKM Hewage`,
    description: blog.summary,
    openGraph: {
      title: blog.title,
      description: blog.summary,
      url: `https://hewagenkm.com/blogs/${blog.id}`,
      images: [ogImage, ...previousImages],
      type: "article",
      publishedTime: blog.createdAt || "",
      modifiedTime: blog.updatedAt || "",
      authors: ["Nadun Malwenna"],
      tags: blog.tags,
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { id } = await params;
  const blog = (await BlogService.getBlogById(id)) as any;

  if (!blog) {
    notFound();
  }

  return (
    <BlogClient
      blog={{
        ...blog,
        date: blog.createdAt,
      }}
    />
  );
}
