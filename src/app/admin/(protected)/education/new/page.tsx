import { Metadata } from "next";
import EducationEditorClient from "@/components/admin/EducationEditorClient";

export const metadata: Metadata = {
  title: "Admin - New Education | NKM Hewage",
};

export default function NewEducationPage() {
  return <EducationEditorClient />;
}
