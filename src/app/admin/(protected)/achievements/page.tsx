import { Metadata } from "next";
import AchievementListClient from "./AchievementListClient";

export const metadata: Metadata = {
  title: "Admin - Achievements | NKM Hewage",
};

export default function AchievementListPage() {
  return <AchievementListClient />;
}
