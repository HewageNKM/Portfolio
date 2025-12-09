"use client";
import { motion } from "framer-motion";
import AchievementCard from "../components/AchievementCard";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  issuer: string;
  link?: string;
}

export default function Achievements({
  achievements = [],
}: {
  achievements: Achievement[];
}) {
  const isLoading = false;

  return (
    <motion.section
      id="achievements"
      className="flex flex-col gap-10 px-4 py-16 max-w-7xl mx-auto w-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold dark:text-white text-black"
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        My Achievements.
      </motion.h2>

      <motion.p
        className="text-gray-600 dark:text-gray-300 md:text-lg max-w-2xl"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
      >
        Here are some of the milestones and recognitions I&apos;ve earned along
        my journey.
      </motion.p>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading achievements...</p>
      ) : (
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((ach, i) => (
            <AchievementCard
              key={ach.id}
              index={i}
              title={ach.title}
              description={ach.description}
              date={ach.date}
              issuer={ach.issuer}
              link={ach.link}
            />
          ))}
          {achievements.length === 0 && (
            <p className="text-center text-gray-500 w-full col-span-3">
              No achievements added yet.
            </p>
          )}
        </ul>
      )}
    </motion.section>
  );
}
