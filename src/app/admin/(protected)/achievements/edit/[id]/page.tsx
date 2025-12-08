import { Metadata } from "next";
import AchievementEditorClient from "@/components/admin/AchievementEditorClient";

export const metadata: Metadata = {
  title: "Admin - Edit Achievement | NKM Hewage",
};

export default async function EditAchievementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AchievementEditorClient id={id} />;
}
