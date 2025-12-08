"use client";
import { motion } from "framer-motion";

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
  return (
    <motion.li
      className="p-5 rounded-lg min-w-full min-h-48 md:min-w-[20rem] bg-gray-50 dark:bg-zinc-800 shadow-lg border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
    >
      <h3 className="text-lg font-semibold dark:text-white text-black mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        {date} · {issuer}
      </p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
        >
          View Certificate →
        </a>
      )}
    </motion.li>
  );
}
