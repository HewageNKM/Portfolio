import { Metadata } from "next";
import ProjectEditorClient from "@/components/admin/ProjectEditorClient";

export const metadata: Metadata = {
  title: "Admin - Edit Project | NKM Hewage",
};

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProjectEditorClient id={id} />;
}
