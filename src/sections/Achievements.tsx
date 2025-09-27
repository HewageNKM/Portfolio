import { motion } from "framer-motion";
import { achievements } from "../assets/contants";
import AchievementCard from "../components/AchievementCard";

export default function Achievements() {
  return (
    <motion.section
      id="achievements"
      className="w-full flex flex-col p-3 gap-6 mt-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-lg dark:text-white text-black font-bold lg:text-xl"
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        My Achievements.
      </motion.h2>

      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((ach, i) => (
          <AchievementCard
            key={i}
            index={i}
            title={ach.title}
            description={ach.description}
            date={ach.date}
            issuer={ach.issuer}
            link={ach.link}
          />
        ))}
      </ul>
    </motion.section>
  );
}
