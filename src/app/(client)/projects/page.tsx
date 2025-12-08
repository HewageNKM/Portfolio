import { Metadata } from "next";
import ProjectsClient, { ProjectItem } from "./ProjectsClient";
import { ProjectService } from "@/services/ProjectService";

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

export default async function ProjectsPage() {
  const projects =
    (await ProjectService.getProjects()) as unknown as ProjectItem[];
  return <ProjectsClient projects={projects} />;
}
