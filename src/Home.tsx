import { AnimatePresence } from "framer-motion";
import "./App.css";
import Footer from "./sections/Footer";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import Message from "./sections/Message";
import Projects from "./sections/Projects";
import Stack from "./sections/Stack";
import { useState } from "react";
import { Setting } from "./components/Setting";
import { Menu } from "./components/Menu";
import Experience from "./sections/Experience";
import SEO from "./components/SEO";
import { CiSettings } from "react-icons/ci";
import { motion } from "framer-motion";

const Home = () => {
  const [showSetting, setShowSetting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

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

      <main className="dark:bg-black relative flex md:gap-5 gap-3 flex-col p-5 pb-2 xl:pt-10 xl:p-[20rem] xl:pb-0.5 w-full">
        <Header showMenu={setShowMenu} showSetting={setShowSetting} />
        <Hero />
        <Experience />
        <Stack />
        <Projects />
        <Message />
        <Footer />
        <AnimatePresence>
          {showSetting && <Setting showSetting={setShowSetting} />}
        </AnimatePresence>
        <AnimatePresence>
          {showMenu && <Menu showMenu={setShowMenu} />}
        </AnimatePresence>

        {/* Dark Mode Switch */}
        <motion.button
          onClick={() => setShowSetting(true)}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.95, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed bottom-5 right-5 bg-black dark:bg-white dark:text-black text-white p-3 rounded-full z-50 shadow-lg cursor-pointer"
          aria-label="Settings"
        >
          <CiSettings size={30} />
        </motion.button>
      </main>
    </>
  );
};

export default Home;
