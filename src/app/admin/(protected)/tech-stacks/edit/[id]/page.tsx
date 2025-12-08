import { Metadata } from "next";
import TechStackEditorClient from "@/components/admin/TechStackEditorClient";

export const metadata: Metadata = {
  title: "Admin - Edit Tech Stack | NKM Hewage",
};

export default async function EditTechStackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TechStackEditorClient id={id} />;
}
