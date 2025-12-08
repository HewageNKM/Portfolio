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
/*                               SEO METADATA                                 */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL("https://hewagenkm.com"),
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
    siteName: "Nadun Malwenna Portfolio",
    description:
      "Portfolio of Nadun Malwenna — showcasing full-stack engineering, mobile apps, cloud solutions, and production-grade system design.",
    images: [
      {
        url: "https://hewagenkm.com/og-home.png",
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
    images: ["https://hewagenkm.com/og-home.png"],
  },
};

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
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

  /* Prepare education data */
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
      {/*                        GOOGLE RICH RESULTS (JSON-LD)                  */}
      {/* ---------------------------------------------------------------------- */}

      {/* Person Schema */}
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
            image: "https://hewagenkm.com/og-home.png",
            sameAs: [
              "https://github.com/YOUR_GITHUB",
              "https://linkedin.com/in/YOUR_LINKEDIN",
            ],
          }),
        }}
      />

      {/* Website Schema */}
      <Script
        id="schema-website"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Nadun Malwenna Portfolio",
            url: "https://hewagenkm.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://hewagenkm.com/?s={search_term}",
              "query-input": "required name=search_term",
            },
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <Script
        id="schema-breadcrumbs"
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

      {/* ---------------------------------------------------------------------- */}
      {/*                             MAIN PAGE                                 */}
      {/* ---------------------------------------------------------------------- */}

      <main className="relative flex flex-col items-center justify-center p-5 pb-20 max-w-7xl mx-auto w-full gap-5">
        <section id="hero">
          <Hero />
        </section>

        <section id="services">
          <Services />
        </section>

        <section id="experience">
          <Experience experiences={experiencesData} />
        </section>

        <section id="education">
          <Education educations={formattedEducations} />
        </section>

        <section id="achievements">
          <Achievements achievements={achievementsData} />
        </section>

        <section id="tech-stack">
          <Stack stacks={stacksData} />
        </section>

        <section id="projects">
          <Projects projects={projectsData.filter((p: any) => p.isFeatured)} />
        </section>
      </main>
    </>
  );
}
