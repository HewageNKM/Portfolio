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
/*                                 SEO METADATA                               */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL("https://hewagenkm.com"),
  applicationName: "NM — Nadun Malwenna",
  title: {
    default: "NM — Nadun Malwenna | Full-Stack Software Engineer",
    template: "%s | NM — Nadun Malwenna",
  },
  description:
    "Explore the portfolio of NM — Nadun Malwenna, a full-stack software engineer skilled in modern web development, cloud services, scalable backend systems, and mobile applications.",
  keywords: [
    "NM",
    "Nadun Malwenna",
    "software engineer",
    "full-stack developer",
    "react developer",
    "nextjs developer",
    "cloud developer",
    "API development",
    "Sri Lanka developer",
  ],
  alternates: {
    canonical: "https://hewagenkm.com",
  },
  openGraph: {
    type: "website",
    url: "https://hewagenkm.com",
    title: "NM — Nadun Malwenna | Portfolio",
    siteName: "NM — Nadun Malwenna",
    description:
      "Portfolio of NM — Nadun Malwenna, showcasing full-stack engineering, cloud apps, mobile development, and production-ready system design.",
    images: [
      {
        url: "https://hewagenkm.com/og-home.webp",
        width: 1200,
        height: 630,
        alt: "NM — Nadun Malwenna Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NM — Nadun Malwenna",
    description:
      "Full-stack software engineer specializing in scalable cloud systems and modern web experiences.",
    images: ["https://hewagenkm.com/og-home.webp"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
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
      {/*                             GLOBAL JSON-LD                            */}
      {/* ---------------------------------------------------------------------- */}

      {/* 1. Breadcrumb Schema */}
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

      {/* 2. Person Schema — NM Branding */}
      <Script
        id="schema-person"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "NM — Nadun Malwenna",
            alternateName: "Nadun Malwenna",
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

      {/* 3. WebSite + Search Schema */}
      <Script
        id="schema-website-search"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://hewagenkm.com",
            name: "NM — Nadun Malwenna",
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
            name: "NM — Nadun Malwenna",
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

      {/* 5. Project Schemas */}
      {projectsData.map((p: any) => (
        <Script
          key={p.id}
          id={`schema-project-${p.id}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareSourceCode",
              name: `${p.title} — by NM`,
              description: p.description,
              url: p.liveUrl || "https://hewagenkm.com",
              image: p.thumbnail,
              author: {
                "@type": "Person",
                name: "NM — Nadun Malwenna",
              },
              programmingLanguage: p.technologies?.join(", "),
            }),
          }}
        />
      ))}

      {/* ---------------------------------------------------------------------- */}
      {/*                                MAIN PAGE                               */}
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
          // @ts-ignore
          stacks={stacksData}
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

export const revalidate = 86400;
