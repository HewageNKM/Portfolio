"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react"; // Added useState
import { ChevronDown, ChevronUp } from "lucide-react"; // Added Icons

interface TimelineItemProps {
  date: string;
  title: string;
  subtitle: string;
  description?: ReactNode;
  icon?: ReactNode;
  isLeft?: boolean; // For desktop alternating layout
}

// Helper component to handle state for description
function DescriptionContent({ content }: { content: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Simple heuristic: if content is a string, check length. If ReactNode, assume it might be long.
  // Or we can just limit by height using CSS line-clamp on a wrapper.
  const isString = typeof content === "string";
  const shouldShowButton = isString ? (content as string).length > 80 : true; // Default to showing button for complex content if we assume it's detailed

  return (
    <div>
      <div className={`${isExpanded ? "" : "line-clamp-3"}`}>{content}</div>
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
  );
}

export default function TimelineItem({
  date,
  title,
  subtitle,
  description,
  icon,
  isLeft,
}: TimelineItemProps) {
  // Mobile: Always right aligned content, icon on left
  // Desktop: Alternating based on isLeft

  return (
    <div
      className={`mb-8 flex justify-between items-center w-full md:flex-row flex-col md:mb-8 ${
        isLeft ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="order-1 w-full md:w-5/12"></div>

      {/* Icon */}
      <div className="z-20 flex items-center order-1 bg-neutral-900 dark:bg-white shadow-xl w-8 h-8 rounded-full absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 flex justify-center items-center">
        <div className="text-white dark:text-neutral-900 text-sm">{icon}</div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: isLeft ? 50 : -50, y: 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        // Reset transform on mobile to avoid layout issues if needed, but framer motion handles it well usually.
        // We'll use responsiveness in classNames mostly.
        className={`order-1 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm rounded-xl shadow-sm w-full md:w-5/12 px-6 py-4 border border-neutral-200 dark:border-neutral-700 ml-12 md:ml-0 ${
          isLeft ? "md:mr-auto" : "md:ml-auto"
        }`}
      >
        <span className="mb-1 block text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
          {date}
        </span>
        <h3 className="font-bold text-neutral-900 dark:text-white text-lg md:text-xl">
          {title}
        </h3>
        <h4 className="mb-2 font-semibold text-neutral-700 dark:text-neutral-300">
          {subtitle}
        </h4>
        {description && (
          <div className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            <DescriptionContent content={description} />
          </div>
        )}
      </motion.div>
    </div>
  );
}
