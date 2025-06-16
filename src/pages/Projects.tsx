import { useState, useEffect } from "react";
import { FiExternalLink } from "react-icons/fi";
import { SiGithub } from "react-icons/si"; // For GitHub icon
import { motion } from "framer-motion"; // Import framer-motion
import { initialProjectsData } from "../assets/contants";

// Define an interface for the project structure
export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  liveUrl?: string; // Optional: if you have a live demo link
  technologies?: string[]; // Optional: list of technologies used
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger children animations
      duration: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
    },
  },
};

export const Projects = () => {
  const [projects] = useState<ProjectItem[]>(initialProjectsData);

  // Effect for setting meta data
  useEffect(() => {
    const pageTitle = "Projects | NKM Hewage";
    const pageDescription =
      "Discover a showcase of projects by NKM Hewage, highlighting skills in web development, software engineering, and various technologies.";
    const pageUrl = window.location.href;

    document.title = pageTitle;

    const setMetaTag = (
      nameOrProperty: string,
      content: string,
      isProperty = false
    ) => {
      const selector = isProperty
        ? `meta[property="${nameOrProperty}"]`
        : `meta[name="${nameOrProperty}"]`;
      let element = document.head.querySelector(selector) as HTMLMetaElement | null;

      if (!element) {
        element = document.createElement("meta");
        if (isProperty) {
          element.setAttribute("property", nameOrProperty);
        } else {
          element.setAttribute("name", nameOrProperty);
        }
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    setMetaTag("description", pageDescription);
    setMetaTag(
      "keywords",
      "projects, portfolio, web development, software engineering, coding, NKM Hewage, full-stack, frontend, backend, technology showcase"
    );

    setMetaTag("og:title", pageTitle, true);
    setMetaTag("og:description", pageDescription, true);
    setMetaTag("og:type", "website", true); // Could also be 'profile' if it's more of a personal portfolio page
    setMetaTag("og:url", pageUrl, true);
    setMetaTag('og:image', 'https://hewagenkm.com/og-image.png', true); // Replace with a relevant image for your projects page

    // Twitter Card Tags
    setMetaTag("twitter:card", "summary", false); // Use 'summary_large_image' if you add a prominent image
    setMetaTag("twitter:title", pageTitle, false);
    setMetaTag("twitter:description", pageDescription, false);
    setMetaTag('twitter:image', 'https://hewagenkm.com/og-image.png', false); // Replace with a relevant image
  }, []); // Empty dependency array: run once on mount

  return (
    <motion.main
      className="flex flex-col min-h-screen dark:bg-black md:px-40 md:py-20 p-8 text-gray-900 dark:text-gray-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      viewport={{ once: true }}
    >
      <motion.div className="mb-12" variants={itemVariants}>
        <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold">Projects.</h1>
      </motion.div>

      {projects.length > 0 ? (
        <motion.ul
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants} // Use container variants for stagger effect
        >
          {projects.map((project) => (
            <motion.li
              key={project.id}
              className="bg-white dark:bg-zinc-800 p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
              variants={itemVariants} // Apply item variants to each project card
            >
              <div>
                <h2 className="text-xl lg:text-2xl font-semibold mb-3 text-black dark:text-white">
                  {project.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                {/* You can uncomment this section if you add technologies to your projectsData */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">
                      Technologies:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-auto pt-4 flex flex-row flex-wrap  gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md font-medium hover:opacity-80 transition-opacity text-sm"
                >
                  <SiGithub size={18} />
                  View on GitHub
                </a>
                {project.liveUrl && (
                  <div className="flex items-center gap-1">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm"
                    >
                      {/* Icon for live link, e.g., <FiExternalLink /> */}
                      View Live
                    </a>
                    <FiExternalLink />
                  </div>
                )}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <motion.div
          className="flex flex-col items-center justify-center h-full mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xl">No Projects to Display at the moment.</p>
          <p className="text-md mt-2 text-gray-600 dark:text-gray-400">
            Check back soon or visit my{" "}
            <a
              href="https://github.com/HewageNKM"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              GitHub profile
            </a>
            .
          </p>
        </motion.div>
      )}
    </motion.main>
  );
};
