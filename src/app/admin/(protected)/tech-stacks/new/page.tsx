import { Metadata } from "next";
import TechStackEditorClient from "@/components/admin/TechStackEditorClient";

export const metadata: Metadata = {
  title: "Admin - New Tech Stack | NKM Hewage",
};

export default function NewTechStackPage() {
  return <TechStackEditorClient />;
}
