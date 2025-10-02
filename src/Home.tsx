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
          // ✅ WebPage
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

          // ✅ Person (Rich card)
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Nadun Malwenna",
            url: "https://hewagenkm.com",
            jobTitle: "Software Engineer",
            sameAs: [
              "https://github.com/HewageNKM",
              "https://www.linkedin.com/in/nadun-malwenna",
              "https://twitter.com/HewageNKM",
            ],
            knowsAbout: [
              "Full-stack development",
              "Mobile apps",
              "Cloud solutions",
              "React",
              "Next.js",
              "Node.js",
              "TypeScript",
            ],
          },

          // ✅ Breadcrumbs
          {
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
                name: "Services",
                item: "https://hewagenkm.com#services",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Experience",
                item: "https://hewagenkm.com#experiences",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Education",
                item: "https://hewagenkm.com#educations",
              },
              {
                "@type": "ListItem",
                position: 5,
                name: "Achievements",
                item: "https://hewagenkm.com#achievements",
              },
              {
                "@type": "ListItem",
                position: 6,
                name: "Skills",
                item: "https://hewagenkm.com#stack",
              },
              {
                "@type": "ListItem",
                position: 7,
                name: "Projects",
                item: "https://hewagenkm.com#works",
              },
              {
                "@type": "ListItem",
                position: 8,
                name: "Contact",
                item: "https://hewagenkm.com/contact",
              },
            ],
          },

          // ✅ ItemList / Carousel without images
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                url: "https://hewagenkm.com#services",
                name: "Services",
                description:
                  "Full-stack development, mobile app development, and cloud solutions.",
              },
              {
                "@type": "ListItem",
                position: 2,
                url: "https://hewagenkm.com/projects",
                name: "Projects",
                description:
                  "Showcase of full-stack projects, mobile apps, and cloud solutions.",
              },
              {
                "@type": "ListItem",
                position: 3,
                url: "https://hewagenkm.com/blogs",
                name: "Blogs",
                description:
                  "Technical blogs and articles about software development.",
              },
              {
                "@type": "ListItem",
                position: 4,
                url: "https://hewagenkm.com#educations",
                name: "Education",
                description: "Education background of Nadun Malwenna.",
              },
              {
                "@type": "ListItem",
                position: 5,
                url: "https://hewagenkm.com#experiences",
                name: "Experience",
                description:
                  "Work history, roles, and responsibilities held by Nadun Malwenna.",
              },
              {
                "@type": "ListItem",
                position: 6,
                url: "https://hewagenkm.com#achievements",
                name: "Achievements",
                description:
                  "Awards and recognitions earned by Nadun Malwenna.",
              },
              {
                "@type": "ListItem",
                position: 7,
                url: "https://hewagenkm.com#stack",
                name: "Skills",
                description:
                  "Technical skills including programming languages, frameworks, and tools.",
              },
              {
                "@type": "ListItem",
                position: 8,
                url: "https://hewagenkm.com/contact",
                name: "Contact",
                description:
                  "Get in touch with Nadun Malwenna for collaboration or inquiries.",
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
