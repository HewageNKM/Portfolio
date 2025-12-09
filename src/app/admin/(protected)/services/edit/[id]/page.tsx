import { Metadata } from "next";
import ServiceEditorClient from "@/components/admin/ServiceEditorClient";

export const metadata: Metadata = {
  title: "Admin - Edit Service | NKM Hewage",
};

export default function EditServicePage({
  params,
}: {
  params: { id: string };
}) {
  return <ServiceEditorClient id={params.id} />;
}
