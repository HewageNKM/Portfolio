import { Metadata } from "next";
import ProjectEditorClient from "@/components/admin/ProjectEditorClient";

export const metadata: Metadata = {
  title: "Admin - New Project | NKM Hewage",
};

export default function NewProjectPage() {
  return <ProjectEditorClient />;
}
