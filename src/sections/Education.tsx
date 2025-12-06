import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import EduCard from "../components/EduCard";
import axios from "axios";
import { API_BASE_URL } from "../config";

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  details: string[];
  gpa?: string;
}

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
  const [educations, setEducations] = useState<EducationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/educations`);
        // Transform data to match EduCard props
        const transformedData = response.data.map((item: any) => ({
          id: item.id,
          degree: item.degree,
          institution: item.institution,
          duration: `${item.startDate} - ${item.endDate}`,
          details: item.description ? item.description.split("\n") : [],
          gpa: item.gpa,
        }));
        setEducations(transformedData);
      } catch (error) {
        console.error("Error fetching educations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEducations();
  }, []);

  return (
    <motion.section
      id="educations"
      className="w-full flex flex-col p-3 gap-8 mt-10"
      initial="hidden"
      whileInView="visible" // Changed from animate to whileInView for scroll trigger
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
      {isLoading ? (
        <p className="text-center text-gray-500">Loading education...</p>
      ) : (
        <motion.ul
          className="flex flex-col gap-8 mt-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {educations.map((edu) => (
            <motion.li
              key={edu.id}
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
          {educations.length === 0 && (
            <p className="text-center text-gray-500">
              No education details added yet.
            </p>
          )}
        </motion.ul>
      )}
    </motion.section>
  );
}
