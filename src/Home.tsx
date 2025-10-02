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
        keywords=""
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Nadun Malwenna - Portfolio",
            url: "https://hewagenkm.com",
            headline: "Nadun Malwenna - Software Engineer",
            description:
              "Portfolio of Nadun Malwenna, a software engineer specializing in full-stack development, mobile apps, and cloud solutions.",
          },
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Projects - Nadun Malwenna",
            description:
              "Explore software engineering projects by Nadun Malwenna, including web apps, mobile apps, and full-stack solutions.",
            url: "https://hewagenkm.com/projects",
            author: {
              "@type": "Person",
              name: "Nadun Malwenna",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Nadun Malwenna's Blog",
            description:
              "Read blogs and articles by Nadun Malwenna about full-stack development, mobile apps, and cloud solutions.",
            url: "https://hewagenkm.com/blogs",
            author: {
              "@type": "Person",
              name: "Nadun Malwenna",
            },
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
