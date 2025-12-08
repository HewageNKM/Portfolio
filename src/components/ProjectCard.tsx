"use client";
import { useState } from "react";
import { SiGithub } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  technologies?: string[];
}

interface ProjectCardProps {
  project: Project;
  variants?: any;
}

export default function ProjectCard({ project, variants }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowButton = project.description.length > 80;

  return (
    <motion.li
      variants={variants}
      className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-gray-200 dark:border-gray-700 overflow-hidden h-full"
    >
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 text-black dark:text-white leading-tight">
          {project.title}
        </h3>
        <div className="mb-3">
          <p
            className={`text-gray-700 dark:text-gray-300 text-sm leading-relaxed ${
              isExpanded ? "" : "line-clamp-3"
            }`}
          >
            {project.description}
          </p>
          {shouldShowButton && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="flex items-center gap-1 text-[10px] font-medium text-neutral-500 hover:text-black dark:hover:text-white mt-1 transition-colors"
            >
              {isExpanded ? (
                <>
                  Show Less <ChevronUp size={10} />
                </>
              ) : (
                <>
                  Show More <ChevronDown size={10} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
      <div className="mt-auto px-4 pb-4 pt-0 flex flex-wrap gap-3">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black rounded-md text-xs font-medium hover:opacity-80 transition-opacity"
        >
          <SiGithub size={14} /> GitHub
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-md text-xs font-medium hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
          >
            <FiExternalLink size={14} /> Live Demo
          </a>
        )}
      </div>
    </motion.li>
  );
}
