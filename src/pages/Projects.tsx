import { useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { SiGithub } from "react-icons/si";
import { motion } from "framer-motion";
import { initialProjectsData } from "../assets/contants";
import SEO from "../components/SEO"; // ✅ Reuse SEO

// Define an interface for the project structure
export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  technologies?: string[];
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
};

export const Projects = () => {
  const [projects] = useState<ProjectItem[]>(initialProjectsData);

  return (
    <>
      {" "}
      <SEO
        title="Projects"
        description="Discover a showcase of projects by Nadun Malwenna, highlighting skills in web development, full-stack engineering, and modern technologies."
        url="https://hewagenkm.com/projects"
        ogImage="https://hewagenkm.com/og-image.png"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Projects - Nadun Malwenna",
            description:
              "Portfolio projects by Nadun Malwenna, showcasing skills in full-stack development, web apps, mobile apps, and open-source contributions.",
            url: "https://hewagenkm.com/projects",
          },
          ...projects.map((p) => ({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: p.title,
            description: p.description,
            applicationCategory: "WebApplication",
            url: p.liveUrl || p.githubUrl,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          })),
        ]}
      />
      <motion.main
        className="flex flex-col min-h-screen dark:text-gray-100"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        viewport={{ once: true }}
      >
        <div className="flex-grow md:px-40 md:py-20 p-8">
          <motion.div className="mb-12" variants={itemVariants}>
            <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold">
              Projects.
            </h1>
          </motion.div>

          {projects.length > 0 ? (
            <motion.ul
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={containerVariants}
            >
              {projects.map((project) => (
                <motion.li
                  key={project.id}
                  className="bg-white dark:bg-zinc-800 p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
                  variants={itemVariants}
                >
                  <div>
                    <h2 className="text-xl lg:text-2xl font-semibold mb-3 text-black dark:text-white">
                      {project.title}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {project.technologies &&
                      project.technologies.length > 0 && (
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

                  <div className="mt-auto pt-4 flex flex-row flex-wrap gap-3">
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
        </div>
      </motion.main>
    </>
  );
};
