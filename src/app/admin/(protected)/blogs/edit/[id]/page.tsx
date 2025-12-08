import { Metadata } from "next";
import BlogEditorClient from "@/components/admin/BlogEditorClient";

export const metadata: Metadata = {
  title: "Admin - Edit Blog | NKM Hewage",
};

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BlogEditorClient id={id} />;
}
