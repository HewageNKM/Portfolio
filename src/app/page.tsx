import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import Stack from "@/sections/Stack";
import Experience from "@/sections/Experience";
import Achievements from "@/sections/Achievements";
import Services from "@/sections/Services";
import Education from "@/sections/Education";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nadun Malwenna - Portfolio",
  description:
    "Explore my work as a software engineer specializing in full-stack development and mobile apps.",
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

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center p-5 pb-20 max-w-7xl mx-auto w-full gap-5">
      <Hero />
      <Services />
      <Experience />
      <Education />
      <Achievements />
      <Stack />
      <Projects />
    </main>
  );
}
