import { Metadata } from "next";
import ServiceEditorClient from "@/components/admin/ServiceEditorClient";

export const metadata: Metadata = {
  title: "Admin - New Service | NKM Hewage",
};

export default function NewServicePage() {
  return <ServiceEditorClient id="new" />;
}
