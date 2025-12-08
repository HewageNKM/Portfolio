import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface EduCardProps {
  degree: string;
  institution: string;
  duration: string;
  description: string[];
  gpa?: string;
}

export default function EduCard({
  degree,
  institution,
  duration,
  description,
  gpa,
}: EduCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  // Estimate length: join description strings and check length
  const fullDescription = description.join(" ");
  const shouldShowButton = fullDescription.length > 80;

  return (
    <article
      className={`flex flex-col p-6 bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        isExpanded ? "h-auto" : "h-[320px]"
      } overflow-hidden`}
    >
      <h3 className="text-xl font-semibold text-black dark:text-white mb-1">
        {degree}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 text-base mb-2">
        {institution}
      </p>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
        {duration}
      </p>

      {/* Description Area */}
      <div className="mb-4 flex-grow">
        <ul
          className={`list-disc list-inside text-gray-700 dark:text-gray-300 text-sm leading-relaxed ${
            isExpanded ? "" : "line-clamp-4"
          }`}
        >
          {description.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
        {shouldShowButton && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="flex items-center gap-1 text-[10px] font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white mt-2 transition-colors"
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

      {gpa && (
        <p className="text-gray-600 dark:text-gray-300 text-sm font-medium mt-auto">
          GPA: {gpa}
        </p>
      )}
    </article>
  );
}
