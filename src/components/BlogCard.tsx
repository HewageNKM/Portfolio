"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

interface BlogCardProps {
  id: string;
  title: string;
  summary: string;
  date: string;
}

export default function BlogCard({ id, title, summary, date }: BlogCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowButton = summary.length > 80;

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-gray-200 dark:border-gray-700 overflow-hidden h-full hover:-translate-y-1">
      <Link href={`/blogs/${id}`} className="flex flex-col h-full">
        <div className="grow p-4">
          <h2 className="text-lg font-bold mb-2 text-black dark:text-white leading-tight">
            {title}
          </h2>
          <div className="mb-3">
            <p
              className={`text-gray-700 dark:text-gray-300 text-sm leading-relaxed ${
                isExpanded ? "" : "line-clamp-3"
              }`}
            >
              {summary}
            </p>
            {shouldShowButton && (
              <button
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation
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
        <div className="mt-auto px-4 pb-4 pt-0">
          <p className="text-xs text-gray-500 dark:text-gray-500 font-mono">
            {new Date(date).toLocaleDateString()}
          </p>
        </div>
      </Link>
    </div>
  );
}
