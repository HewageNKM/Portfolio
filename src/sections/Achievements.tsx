import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AchievementCard from "../components/AchievementCard";
import axios from "axios";
import { API_BASE_URL } from "../AppSettings";

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  issuer: string;
  link?: string;
}

export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/achievements`);
        setAchievements(response.data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  return (
    <motion.section
      id="achievements"
      className="w-full flex flex-col p-3 gap-8 mt-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-lg dark:text-white text-black font-bold lg:text-xl"
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
      >
        My Achievements.
      </motion.h2>

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
