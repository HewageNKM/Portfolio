import { motion } from "framer-motion";
import { educations } from "../assets/contants";
import EduCard from "../components/EduCard";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      type: "spring",
      stiffness: 80,
      damping: 20,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

export default function Education() {
  return (
    <motion.section
      id="educations"
      className="w-full flex flex-col p-3 gap-8 mt-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      viewport={{ once: true }}
    >
      {/* Title */}
      <motion.div className="space-y-4" variants={itemVariants}>
        <motion.h2
          className="text-lg dark:text-white text-black font-bold lg:text-xl"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          My Education.
        </motion.h2>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-600 dark:text-gray-300 md:text-lg max-w-2xl"
        >
          My academic journey has provided me with a strong foundation in
          computer science and software engineering. Here's a summary of my
          educational background.
        </motion.p>
      </motion.div>

      {/* Education Grid */}
      <motion.ul
        className="flex flex-col gap-8 mt-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {educations.map((edu, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg"
          >
            <EduCard
              degree={edu.degree}
              institution={edu.institution}
              duration={edu.duration}
              description={edu.details}
              gpa={edu.gpa}
            />
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
}
