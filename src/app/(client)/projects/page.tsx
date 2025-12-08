import { db } from "@/lib/firebase-admin";
import { Metadata } from "next";
import ProjectsView, { ProjectItem } from "./ProjectsView";

export const metadata: Metadata = {
  title: "Projects | NKM Hewage",
  description:
    "Discover a showcase of projects by Nadun Malwenna, highlighting skills in web development, full-stack engineering, and modern technologies.",
  openGraph: {
    title: "Projects | NKM Hewage",
    description: "Portfolio projects by Nadun Malwenna, showcasing skills.",
    url: "https://hewagenkm.com/projects",
    images: ["https://hewagenkm.com/og-projects.png"],
    type: "website",
  },
};

async function getProjects() {
  const snapshot = await db
    .collection("projects")
    .orderBy("createdAt", "desc")
    .get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProjectItem[];
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsView projects={projects} />;
}
