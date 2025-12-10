import { Metadata } from "next";
import Script from "next/script";

import ProjectsClient, { ProjectItem } from "./ProjectsClient";
import { ProjectService } from "@/services/ProjectService";

/* -------------------------------------------------------------------------- */
/*                                   SEO                                      */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL("https://hewagenkm.com"),
  title: "Projects | NKM Hewage",
  description:
    "Explore all projects by Nadun Malwenna, showcasing full-stack engineering, web applications, cloud services, and modern frontend development.",
  keywords: [
    "projects",
    "portfolio projects",
    "software projects",
    "web development projects",
    "react projects",
    "nextjs developer portfolio",
    "nadun malwenna projects",
  ],
  alternates: {
    canonical: "https://hewagenkm.com/projects",
  },
  openGraph: {
    title: "Projects | NKM Hewage",
    description:
      "Portfolio projects by Nadun Malwenna, showcasing full-stack and web-application solutions.",
    url: "https://hewagenkm.com/projects",
    type: "website",
    images: [
      {
        url: "https://hewagenkm.com/og-projects.webp",
        width: 1200,
        height: 630,
        alt: "Projects - NKM Hewage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | NKM Hewage",
    description: "Explore portfolio projects by Nadun Malwenna.",
    images: ["https://hewagenkm.com/og-projects.webp"],
  },
};

/* -------------------------------------------------------------------------- */
/*                                     PAGE                                   */
/* -------------------------------------------------------------------------- */

export default async function ProjectsPage() {
  const projects =
    (await ProjectService.getProjects()) as unknown as ProjectItem[];

  /* ------------------------- JSON-LD: INDIVIDUAL PROJECTS ------------------------- */
  const projectSchemas = projects.map((project) => ({
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `https://hewagenkm.com/projects/${project.id}`,
    image: "https://hewagenkm.com/og-projects.webp",
    creator: {
      "@type": "Person",
      name: "Nadun Malwenna",
    },
  }));

  return (
    <>
      {/* ---------------------------------------------------------------------- */}
      {/*                           STRUCTURED DATA                             */}
      {/* ---------------------------------------------------------------------- */}

      {/* CollectionPage Schema */}
      <Script
        id="schema-projects-collection"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Projects - Nadun Malwenna",
            url: "https://hewagenkm.com/projects",
            description:
              "A full showcase of projects created by software engineer Nadun Malwenna.",
            hasPart: projectSchemas,
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <Script
        id="schema-projects-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://hewagenkm.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Projects",
                item: "https://hewagenkm.com/projects",
              },
            ],
          }),
        }}
      />

      {/* WebSite Schema + SearchAction */}
      <Script
        id="schema-projects-website"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "NKM Hewage Portfolio",
            url: "https://hewagenkm.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://hewagenkm.com/search?q={query}",
              "query-input": "required name=query",
            },
          }),
        }}
      />

      {/* Organization Schema */}
      <Script
        id="schema-projects-organization"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Nadun Malwenna",
            url: "https://hewagenkm.com",
            logo: "https://hewagenkm.com/og-home.webp",
            sameAs: [
              "https://github.com/HewageNKM",
              "https://linkedin.com/in/nadun-malwenna",
            ],
          }),
        }}
      />

      {/* ---------------------------------------------------------------------- */}
      {/*                                MAIN UI                                */}
      {/* ---------------------------------------------------------------------- */}

      <main className="max-w-7xl mx-auto px-4 py-10">
        <ProjectsClient projects={projects} />
      </main>
    </>
  );
}
