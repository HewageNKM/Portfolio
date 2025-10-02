import "./App.css";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Stack from "./sections/Stack";
import Experience from "./sections/Experience";
import SEO from "./components/SEO";
import Achievements from "./sections/Achievements";
import Services from "./sections/Services";
import Education from "./sections/Education";

const Home = () => {
  return (
    <>
      <SEO
        title="Nadun Malwenna - Portfolio"
        description="Explore my work as a software engineer specializing in full-stack development and mobile apps."
        keywords="software engineer, full-stack developer, mobile apps, cloud solutions, Nadun Malwenna"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Nadun Malwenna - Portfolio",
            url: "https://hewagenkm.com",
            headline: "Nadun Malwenna - Software Engineer",
            description:
              "Portfolio of Nadun Malwenna, a software engineer specializing in full-stack development, mobile apps, and cloud solutions.",
            author: {
              "@type": "Person",
              name: "Nadun Malwenna",
              url: "https://hewagenkm.com",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@type": "Service",
                  name: "Services",
                  url: "https://hewagenkm.com#services",
                  description:
                    "Full-stack development, mobile app development, and cloud solutions.",
                },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@type": "CreativeWork",
                  name: "Projects",
                  url: "https://hewagenkm.com/projects",
                  description:
                    "Showcase of full-stack projects, mobile apps, and cloud solutions.",
                },
              },
              {
                "@type": "ListItem",
                position: 3,
                item: {
                  "@type": "CreativeWork",
                  name: "Blogs",
                  url: "https://hewagenkm.com/blogs",
                  description:
                    "Technical blogs and articles about software development.",
                },
              },
              {
                "@type": "ListItem",
                position: 4,
                item: {
                  "@type": "EducationalOccupationalCredential",
                  name: "Educations",
                  url: "https://hewagenkm.com#educations",
                  description: "Education background of Nadun Malwenna.",
                },
              },
              {
                "@type": "ListItem",
                position: 5,
                item: {
                  "@type": "WorkExperience",
                  name: "Experience",
                  url: "https://hewagenkm.com#experiences",
                  description:
                    "Work history, roles, and responsibilities held by Nadun Malwenna.",
                },
              },
              {
                "@type": "ListItem",
                position: 6,
                item: {
                  "@type": "Award",
                  name: "Achievements",
                  description:
                    "Achievements, awards, and recognitions earned by Nadun Malwenna in software engineering and development.",
                  url: "https://hewagenkm.com#achievements",
                },
              },
              {
                "@type": "ListItem",
                position: 7,
                item: {
                  name: "Skills",
                  description:
                    "Technical skills and technologies Nadun Malwenna is proficient in, including programming languages, frameworks, and tools.",
                  url: "https://hewagenkm.com#stack",
                },
              },
            ],
          },
        ]}
      />

      <main className="relative flex md:gap-5 gap-3 flex-col p-5 pb-2 xl:pt-10 xl:p-[16rem] xl:pb-0.5 w-full">
        <Hero />
        <Services />
        <Experience />
        <Education />
        <Achievements />
        <Stack />
        <Projects />
      </main>
    </>
  );
};

export default Home;
