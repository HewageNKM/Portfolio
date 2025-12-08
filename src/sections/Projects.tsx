"use client";
import { useState, useEffect } from "react";
import { PiArrowRight } from "react-icons/pi";
import { SiGithub } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi"; // Added for live link icon
import { motion, Variants } from "framer-motion";
import { apiClient } from "@/lib/api-client";

// Define an interface for the project structure
interface Project {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  technologies?: string[]; // Optional
  isFeatured?: boolean;
}

// ... variants ...
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      type: "spring",
      stiffness: 80,
      damping: 20,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const response = await apiClient.get(`/projects?featured=true`);
        setProjects(response.data);
      } catch (error) {
        // Handled by interceptor
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeaturedProjects();
  }, []);

  return (
    <motion.section
      id="works"
      className="flex flex-col py-10 px-4 md:px-0 gap-6 w-full"
      initial={{ opacity: 0 }} // Start with hidden opacity
      whileInView={{ opacity: 1 }} // Fade in when in view
      transition={{ duration: 0.8 }} // Animation duration for opacity
      viewport={{ once: true }} // Trigger animation only once when in view
    >
      {/* Section Heading with animation */}
      <motion.h2
        className="text-lg dark:text-white text-black font-bold lg:text-xl"
        initial={{ y: -20, opacity: 0 }} // Start with slight upward movement and hidden opacity
        whileInView={{ y: 0, opacity: 1 }} // Move to original position and fade in
        transition={{ duration: 0.6 }} // Animation duration for heading
        viewport={{ once: true }} // Trigger animation only once
      >
        My Works.
      </motion.h2>
      <motion.p
        className="md:text-lg text-sm dark:text-white text-black"
        variants={itemVariants}
      >
        Here are some of the recent projects I&apos;ve worked on.
      </motion.p>

      {/* Grid for Project Cards */}
      {isLoading ? (
        <p className="text-center dark:text-white text-black">
          Loading projects...
        </p>
      ) : projects.length > 0 ? (
        <motion.ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.li
              key={project.id}
              variants={itemVariants}
              className="bg-white dark:bg-zinc-800 p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between border border-gray-200 dark:border-gray-700"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
                  {project.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                {/* Optional: Display technologies
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <span key={tech} className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full text-gray-800 dark:text-gray-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )} */}
              </div>
              <div className="mt-auto pt-3 flex flex-wrap gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black rounded-md text-xs font-medium hover:opacity-80 transition-opacity"
                >
                  <SiGithub size={16} /> GitHub
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-md text-xs font-medium hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <FiExternalLink size={16} /> Live Demo
                  </a>
                )}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <motion.p
          className="text-center dark:text-white text-black mt-3 text-sm md:text-lg font-bold"
          initial={{ opacity: 0 }} // Start with hidden opacity
          whileInView={{ opacity: 1 }} // Fade in when in view
          transition={{ duration: 0.6 }} // Animation duration for message
          viewport={{ once: true }} // Trigger animation only once
        >
          No Projects!
        </motion.p>
      )}

      {/* Buttons to view all projects and GitHub profile */}
      <div className="w-full flex mt-3 gap-5 flex-row justify-center">
        <motion.a
          href="https://github.com/HewageNKM"
          target="_blank"
          rel="noopener noreferrer" // Added for security
          className="group dark:border-white dark:text-white border-black text-black border items-center mt-5 gap-2 rounded-md py-2 px-4 flex-row flex font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          initial={{ opacity: 0 }} // Start with hidden opacity
          whileInView={{ opacity: 1 }} // Fade in when in view
          transition={{ duration: 0.8, delay: 0.4 }} // Animation duration with delay
          viewport={{ once: true }} // Trigger animation only once
        >
          <SiGithub /> {/* GitHub icon */}
        </motion.a>
        <motion.a
          href="/projects"
          className="group dark:bg-white dark:text-black bg-black items-center mt-5 gap-2 rounded-md py-2 px-4 flex-row flex text-white font-medium hover:opacity-80 transition-opacity"
          initial={{ opacity: 0 }} // Start with hidden opacity
          whileInView={{ opacity: 1 }} // Fade in when in view
          transition={{ duration: 0.8, delay: 0.4 }} // Animation duration with delay
          viewport={{ once: true }} // Trigger animation only once
        >
          <span className="font-bold">Show All</span>
          {/* Arrow icon with hover animation */}
          <PiArrowRight
            className="font-bold transition-transform duration-300 group-hover:translate-x-2" // Animate on hover
            size={20}
          />
        </motion.a>
      </div>
    </motion.section>
  );
}
