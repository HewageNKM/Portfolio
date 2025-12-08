import { Metadata } from "next";
import ExperienceEditorClient from "@/components/admin/ExperienceEditorClient";

export const metadata: Metadata = {
  title: "Admin - Edit Experience | NKM Hewage",
};

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ExperienceEditorClient id={id} />;
}
