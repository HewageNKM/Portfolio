"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  items?: string[];
  color?: string;
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  items = [],
  color = "#3B82F6", // Default Blue
}: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowButton = description.length > 60;

  return (
    <div
      className="relative group w-full rounded-2xl overflow-hidden cursor-default transition-all duration-300 hover:shadow-lg hover:-translate-y-1 min-h-full flex flex-col"
      style={
        {
          "--service-color": color,
        } as React.CSSProperties
      }
    >
      {/* Background with Subtle Hover Effect */}
      <div className="absolute inset-0 bg-white dark:bg-zinc-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl transition-colors duration-300 group-hover:border-[var(--service-color)]/50" />

      {/* Content */}
      <div className="relative p-4 flex flex-col items-start text-left h-full">
        {/* Icon & Title Row */}
        <div className="flex items-center gap-3 mb-3">
          <div className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white group-hover:bg-[var(--service-color)] group-hover:text-white transition-colors duration-300">
            <Icon className="text-lg" />
          </div>
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white leading-tight">
            {title}
          </h3>
        </div>

        {/* Description */}
        <div className="mb-3">
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

        {/* Tags Inline (Always Visible or Subtle Reveal) */}
        <div className="mt-auto flex flex-wrap gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
          {items.slice(0, 3).map((item, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-700 text-neutral-500 dark:text-neutral-300 rounded-md"
            >
              {item}
            </span>
          ))}
          {items.length > 3 && (
            <span className="text-[10px] px-1 py-0.5 text-neutral-400">
              +{items.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
