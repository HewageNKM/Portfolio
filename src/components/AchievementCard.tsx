"use client";
import { motion } from "framer-motion";

import { useState } from "react";
import { Award, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

interface AchievementCardProps {
  title: string;
  description: string;
  date: string;
  issuer: string;
  link?: string;
  index?: number;
}

export default function AchievementCard({
  title,
  description,
  date,
  issuer,
  link,
  index = 0,
}: AchievementCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowButton = description.length > 60;

  return (
    <motion.li
      className="relative group w-full h-full rounded-2xl overflow-hidden cursor-default transition-all duration-300 hover:shadow-lg hover:-translate-y-1 list-none"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* Background with Subtle Hover Effect */}
      <div className="absolute inset-0 bg-white dark:bg-zinc-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl transition-colors duration-300 group-hover:border-yellow-500/50" />

      {/* Content */}
      <div className="relative p-4 flex flex-col items-start text-left h-full">
        {/* Header: Icon & Title */}
        <div className="flex items-start gap-3 mb-3 w-full">
          <div className="p-1.5 shrink-0 rounded-lg bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 group-hover:bg-yellow-500 group-hover:text-white transition-colors duration-300">
            <Award className="text-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white leading-tight mb-0.5 truncate">
              {title}
            </h3>
            <p className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider truncate">
              {issuer}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-3 w-full">
          <p
            className={`text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed ${
              isExpanded ? "" : "line-clamp-3"
            }`}
          >
            {description}
          </p>
          {shouldShowButton && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="flex items-center gap-1 text-[10px] font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white mt-1 transition-colors"
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

        {/* Footer: Date & Link */}
        <div className="mt-auto flex items-center justify-between w-full pt-2 border-t border-neutral-100 dark:border-neutral-800/50">
          <span className="text-[10px] text-neutral-400 font-mono">{date}</span>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] font-medium text-neutral-900 dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
            >
              Verify <ExternalLink size={10} />
            </a>
          )}
        </div>
      </div>
    </motion.li>
  );
}
