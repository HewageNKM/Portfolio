import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import Stack, { TechStack } from "@/sections/Stack";
import Experience, { ExperienceData } from "@/sections/Experience";
import Achievements, { Achievement } from "@/sections/Achievements";
import Services from "@/sections/Services"; // Static, no props needed
import Education, { EducationItem } from "@/sections/Education";
import { Metadata } from "next";
import { ProjectService } from "@/services/ProjectService";
import { ExperienceService } from "@/services/ExperienceService";
import { EducationService } from "@/services/EducationService";
import { AchievementService } from "@/services/AchievementService";
import { TechStackService } from "@/services/TechStackService";

export const metadata: Metadata = {
  title: "Nadun Malwenna - Portfolio",
  description:
    "Explore the portfolio of Nadun Malwenna, a software engineer specializing in full-stack development, mobile applications, and creating innovative web solutions.",
  keywords: [
    "software engineer",
    "full-stack developer",
    "mobile apps",
    "cloud solutions",
    "Nadun Malwenna",
  ],
  openGraph: {
    images: ["https://hewagenkm.com/og-home.png"],
    type: "website",
    url: "https://hewagenkm.com",
    siteName: "Nadun Malwenna Portfolio",
  },
};

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

  return (
    <main className="relative flex flex-col items-center justify-center p-5 pb-20 max-w-7xl mx-auto w-full gap-5">
      <Hero />
      <Services />
      <Experience
        experiences={experiencesData as unknown as ExperienceData[]}
      />
      <Education
        educations={
          educationsData.map((item: any) => ({
            id: item.id,
            degree: item.degree,
            institution: item.institution,
            duration: `${item.startDate} - ${item.endDate}`,
            details: item.description ? item.description.split("\n") : [],
            gpa: item.gpa,
          })) as EducationItem[]
        }
      />
      <Achievements
        achievements={achievementsData as unknown as Achievement[]}
      />
      <Stack stacks={stacksData as unknown as TechStack[]} />
      <Projects
        projects={projectsData.filter((p: any) => p.isFeatured) as any[]}
      />
    </main>
  );
}
