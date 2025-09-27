import "./App.css";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Message from "./sections/Message";
import Projects from "./sections/Projects";
import Stack from "./sections/Stack";
import Experience from "./sections/Experience";
import SEO from "./components/SEO";
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
            "@type": "WebSite",
            url: "https://hewagenkm.com",
            name: "Nadun Malwenna - Portfolio",
            publisher: { "@type": "Person", name: "Nadun Malwenna" },
          },
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Nadun Malwenna - Portfolio",
            url: "https://hewagenkm.com",
            description:
              "Explore the portfolio of Nadun Malwenna, software engineer specializing in full-stack development, mobile apps, and web solutions.",
          },
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Nadun Malwenna",
            url: "https://hewagenkm.com",
            jobTitle: "Software Engineer",
            knowsAbout: [
              "Full-Stack Development",
              "Mobile Apps",
              "React",
              "Spring Boot",
              "Cloud Computing",
              "Machine Learning",
            ],
            sameAs: [
              "https://github.com/HewageNKM",
              "https://linkedin.com/in/nadun-malwenna",
              "https://x.com/HewageNKM",
            ],
          },
        ]}
      />

      <main className="relative flex md:gap-5 gap-3 flex-col p-5 pb-2 xl:pt-10 xl:p-[20rem] xl:pb-0.5 w-full">
        <Hero />
        <Experience />
        <Stack />
        <Projects />
        <Message />
      </main>
    </>
  );
};

export default Home;
