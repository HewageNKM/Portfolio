import { Metadata } from "next";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Admin - Blogs | NKM Hewage",
};

export default function BlogListPage() {
  return <BlogListClient />;
}
