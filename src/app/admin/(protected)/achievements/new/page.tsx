import { Metadata } from "next";
import AchievementEditorClient from "@/components/admin/AchievementEditorClient";

export const metadata: Metadata = {
  title: "Admin - New Achievement | NKM Hewage",
};

export default function NewAchievementPage() {
  return <AchievementEditorClient />;
}
