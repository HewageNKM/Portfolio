import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import Stack from "@/sections/Stack";
import Experience from "@/sections/Experience";
import Achievements from "@/sections/Achievements";
import Services from "@/sections/Services";
import Education, { EducationItem } from "@/sections/Education";

import { Metadata } from "next";
import Script from "next/script";

import { ProjectService } from "@/services/ProjectService";
import { ExperienceService } from "@/services/ExperienceService";
import { EducationService } from "@/services/EducationService";
import { AchievementService } from "@/services/AchievementService";
import { TechStackService } from "@/services/TechStackService";

/* -------------------------------------------------------------------------- */
/* SEO METADATA                                 */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL("https://hewagenkm.com"),
  // 'applicationName' helps Google identify the Brand Name instead of showing the domain
  applicationName: "Nadun Malwenna",
  title: {
    default: "Nadun Malwenna - Full-Stack Software Engineer",
    template: "%s | Nadun Malwenna",
  },
  description:
    "Explore the portfolio of Nadun Malwenna — a full-stack software engineer specializing in modern web development, cloud services, scalable backend systems, and mobile applications.",
  keywords: [
    "software engineer",
    "full-stack developer",
    "react developer",
    "nextjs developer",
    "mobile app developer",
    "cloud developer",
    "API development",
    "Sri Lanka software engineer",
    "Nadun Malwenna",
  ],
  alternates: {
    canonical: "https://hewagenkm.com",
  },
  openGraph: {
    type: "website",
    url: "https://hewagenkm.com",
    title: "Nadun Malwenna - Portfolio",
    // This 'siteName' is what appears above the URL in Google Search
    siteName: "Nadun Malwenna",
    description:
      "Portfolio of Nadun Malwenna — showcasing full-stack engineering, mobile apps, cloud solutions, and production-grade system design.",
    images: [
      {
        url: "https://hewagenkm.com/og-home.webp",
        width: 1200,
        height: 630,
        alt: "Nadun Malwenna Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nadun Malwenna - Portfolio",
    description:
      "Full-stack software engineer building scalable apps, cloud systems, and modern web experiences.",
    images: ["https://hewagenkm.com/og-home.webp"],
  },
  // Adding icons ensures the brand logo appears next to the site name in search
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

/* -------------------------------------------------------------------------- */
/* PAGE                                     */
/* -------------------------------------------------------------------------- */

export default async function Home() {
  const [
    projectsData,
    experiencesData,
    educationsData,
    achievementsData,
    stacksData,
  ] = await Promise.all([
    ProjectService.getProjects(),
    ExperienceService.getExperiences(),
    EducationService.getEducations(),
    AchievementService.getAchievements(),
    TechStackService.getTechStacks(),
  ]);

  const formattedEducations: EducationItem[] = educationsData.map(
    (item: any) => ({
      id: item.id,
      degree: item.degree,
      institution: item.institution,
      duration: `${item.startDate} - ${item.endDate}`,
      details: item.description ? item.description.split("\n") : [],
      gpa: item.gpa,
    })
  );

  return (
    <>
      {/* ---------------------------------------------------------------------- */}
      {/* GLOBAL RICH RESULTS (JSON-LD)                  */}
      {/* ---------------------------------------------------------------------- */}

      {/* 1. Breadcrumb Schema (FIXED: Added this to solve breadcrumb errors) */}
      <Script
        id="schema-breadcrumb"
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
            ],
          }),
        }}
      />

      {/* 2. Person Schema (Primary Entity) */}
      <Script
        id="schema-person"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Nadun Malwenna",
            url: "https://hewagenkm.com",
            jobTitle: "Full-Stack Software Engineer",
            image: "https://hewagenkm.com/og-home.webp",
            sameAs: [
              "https://github.com/HewageNKM",
              "https://linkedin.com/in/nadun-malwenna",
            ],
            alumniOf: formattedEducations.map((edu) => ({
              "@type": "CollegeOrUniversity",
              name: edu.institution,
            })),
          }),
        }}
      />

      {/* 3. Website + Search Box Schema */}
      <Script
        id="schema-website-search"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://hewagenkm.com",
            name: "Nadun Malwenna", // Matches metadata applicationName
            potentialAction: {
              "@type": "SearchAction",
              target: "https://hewagenkm.com/search?q={query}",
              "query-input": "required name=query",
            },
          }),
        }}
      />

      {/* 4. Experience Schema */}
      <Script
        id="schema-experience"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Nadun Malwenna",
            hasOccupation: experiencesData.map((exp: any) => ({
              "@type": "Occupation",
              name: exp.role,
              description: exp.description,
              occupationLocation: {
                "@type": "Organization",
                name: exp.company,
              },
            })),
          }),
        }}
      />

      {/* 5. Project Schema */}
      {projectsData.map((p: any) => (
        <Script
          key={p.id}
          id={`schema-project-${p.id}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareSourceCode", // Specific for software projects
              name: p.title,
              description: p.description,
              url: p.liveUrl || "https://hewagenkm.com",
              image: p.thumbnail,
              author: {
                "@type": "Person",
                name: "Nadun Malwenna",
              },
              programmingLanguage: p.technologies?.join(", "),
            }),
          }}
        />
      ))}

      {/* ---------------------------------------------------------------------- */}
      {/* MAIN PAGE                                 */}
      {/* ---------------------------------------------------------------------- */}

      <main className="relative">
        <Hero />
        <Services />

        <Experience
          experiences={experiencesData.map((item: any) => ({
            id: item.id,
            role: item.role,
            company: item.company,
            duration: item.duration,
            description: item.description,
          }))}
        />

        <Education educations={formattedEducations} />

        <Achievements
          achievements={achievementsData.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            date: item.date,
            issuer: item.issuer || item.organization || "N/A",
            link: item.link,
          }))}
        />

        <Stack
          stacks={stacksData.flatMap((stack: any) =>
            (stack.items || []).map((item: any) => ({
              id: item.id || `${stack.id}-${item.name}`,
              name: item.name,
              category: stack.category,
              icon: item.icon,
            }))
          )}
        />

        <Projects
          projects={projectsData
            .filter((p: any) => p.isFeatured)
            .map((p: any) => ({
              id: p.id,
              title: p.title,
              description: p.description,
              githubUrl: p.githubUrl,
              liveUrl: p.liveUrl,
              technologies: p.technologies,
              image: p.thumbnail,
            }))}
        />
      </main>
    </>
  );
}
