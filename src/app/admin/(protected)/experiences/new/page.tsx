import { Metadata } from "next";
import ExperienceEditorClient from "@/components/admin/ExperienceEditorClient";

export const metadata: Metadata = {
  title: "Admin - New Experience | NKM Hewage",
};

export default function NewExperiencePage() {
  return <ExperienceEditorClient />;
}
