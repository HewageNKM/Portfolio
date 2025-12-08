"use client";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import EduCard from "../components/EduCard";
import { apiClient } from "@/lib/api-client";

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  details: string[];
  gpa?: string;
}

const containerVariants: Variants = {
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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

import Timeline from "@/components/Timeline";
import TimelineItem from "@/components/TimelineItem";
import { GraduationCap } from "lucide-react";

export default function Education() {
  const [educations, setEducations] = useState<EducationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const response = await apiClient.get(`/educations`);
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
        // Handled by interceptor
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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Title */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
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
        <Timeline>
          {educations.map((edu, index) => (
            <TimelineItem
              key={edu.id}
              date={edu.duration}
              title={edu.degree}
              subtitle={edu.institution}
              isLeft={index % 2 === 0}
              icon={<GraduationCap size={16} />}
              description={
                <div className="space-y-2">
                  {edu.gpa && (
                    <p className="font-semibold text-neutral-800 dark:text-neutral-200">
                      GPA: {edu.gpa}
                    </p>
                  )}
                  {edu.details && edu.details.length > 0 && (
                    <ul className="list-disc list-inside space-y-1">
                      {edu.details.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              }
            />
          ))}
        </Timeline>
      )}
      {!isLoading && educations.length === 0 && (
        <p className="text-center text-gray-500">
          No education details added yet.
        </p>
      )}
    </motion.section>
  );
}
