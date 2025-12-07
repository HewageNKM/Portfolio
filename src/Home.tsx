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
        ogImage="https://hewagenkm.com/og-home.png"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Nadun Malwenna - Portfolio",
            url: "https://hewagenkm.com",
            headline: "Nadun Malwenna - Software Engineer",
            description:
              "Portfolio of Nadun Malwenna, a software engineer specializing in full-stack development, mobile apps, and cloud solutions.",
            primaryImageOfPage: "https://hewagenkm.com/og-home.png",
            author: {
              "@type": "Person",
              name: "Nadun Malwenna",
              url: "https://hewagenkm.com",
            },
          },

          // Person Schema
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Nadun Malwenna",
            url: "https://hewagenkm.com",
            jobTitle: "Software Engineer",
            image: "https://hewagenkm.com/og-home.png",
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

          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Nadun Malwenna Portfolio",
            url: "https://hewagenkm.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://hewagenkm.com/search?q={query}",
              "query-input": "required name=query",
            },
          },

          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Nadun Malwenna",
            url: "https://hewagenkm.com",
            logo: "https://hewagenkm.com/og-home.png",
            sameAs: [
              "https://github.com/HewageNKM",
              "https://www.linkedin.com/in/nadun-malwenna",
              "https://twitter.com/HewageNKM",
            ],
          },

          {
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            name: "Software Engineering Services",
            url: "https://hewagenkm.com#services",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Full-stack Development",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Mobile App Development",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Cloud Solutions",
                },
              },
            ],
          },

          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                url: "https://hewagenkm.com",
                name: "Home",
                description:
                  "Home page of Nadun Malwenna, a software engineer specializing in full-stack development, mobile apps, and cloud solutions.",
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
