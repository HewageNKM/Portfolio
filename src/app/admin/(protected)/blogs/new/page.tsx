import { Metadata } from "next";
import BlogEditorClient from "@/components/admin/BlogEditorClient";

export const metadata: Metadata = {
  title: "Admin - New Blog | NKM Hewage",
};

export default function NewBlogPage() {
  return <BlogEditorClient />;
}
