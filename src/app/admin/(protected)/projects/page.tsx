import { Metadata } from "next";
import ProjectListClient from "./ProjectListClient";

export const metadata: Metadata = {
  title: "Admin - Projects | NKM Hewage",
};

export default function ProjectListPage() {
  return <ProjectListClient />;
}
