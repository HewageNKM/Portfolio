import { Metadata } from "next";
import EducationEditorClient from "@/components/admin/EducationEditorClient";

export const metadata: Metadata = {
  title: "Admin - Edit Education | NKM Hewage",
};

export default async function EditEducationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EducationEditorClient id={id} />;
}
