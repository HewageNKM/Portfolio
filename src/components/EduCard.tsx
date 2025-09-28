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
  return (
    <article className="flex flex-col p-6 bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-gray-700 h-full">
      <h3 className="text-xl font-semibold text-black dark:text-white mb-1">
        {degree}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 text-base mb-2">
        {institution}
      </p>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
        {duration}
      </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {description.map((point, i) => (<li key={i}>{point}</li>))}
        </ul>
      {gpa && (
        <p className="text-gray-600 dark:text-gray-300 text-sm font-medium mt-3">
          GPA: {gpa}
        </p>
      )}
    </article>
  );
}
