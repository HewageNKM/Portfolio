import { db } from "@/lib/firebase-admin";
import { Metadata, ResolvingMetadata } from "next";
import BlogView from "./BlogView";
import { notFound } from "next/navigation";

// Fetch blog data
async function getBlog(id: string) {
  const doc = await db.collection("blogs").doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as any;
}

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];
  const ogImage =
    (blog.content.match(/<img[^>]+src="([^">]+)"/) || [])[1] ||
    "https://hewagenkm.com/og-blogs.png";

  return {
    title: `${blog.title} | NKM Hewage`,
    description: blog.summary,
    openGraph: {
      title: blog.title,
      description: blog.summary,
      url: `https://hewagenkm.com/blogs/${blog.id}`,
      images: [ogImage, ...previousImages],
      type: "article",
      publishedTime: blog.date,
      modifiedTime: blog.date,
      authors: ["Nadun Malwenna"],
      tags: blog.tags,
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    notFound();
  }

  return <BlogView blog={blog} />;
}
