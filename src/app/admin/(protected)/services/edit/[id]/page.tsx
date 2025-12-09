import { Metadata } from "next";
import ServiceEditorClient from "@/components/admin/ServiceEditorClient";

export const metadata: Metadata = {
  title: "Admin - Edit Service | NKM Hewage",
};

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ServiceEditorClient id={id} />;
}
