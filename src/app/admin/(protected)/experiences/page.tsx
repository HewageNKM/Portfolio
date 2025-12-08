import { Metadata } from "next";
import ExperienceListClient from "./ExperienceListClient";

export const metadata: Metadata = {
  title: "Admin - Experience | NKM Hewage",
};

export default function ExperienceListPage() {
  return <ExperienceListClient />;
}
