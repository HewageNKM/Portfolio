"use client";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import Timeline from "@/components/Timeline";
import TimelineItem from "@/components/TimelineItem";

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  details: string[];
  gpa?: string;
}

const Education = ({ educations = [] }: { educations: EducationItem[] }) => {
  const isLoading = false;

  return (
    <motion.section
      id="educations"
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
        My Education.
      </motion.h2>
      <motion.p
        className="text-gray-600 dark:text-gray-300 md:text-lg max-w-2xl"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
      >
        My academic journey has provided me with a strong foundation in computer
        science and software engineering.
      </motion.p>

      <div className="mt-4">
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
      </div>

      <motion.p
        className="text-center md:text-left text-sm md:text-base dark:text-gray-300 text-gray-700 mt-4"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
      >
        My academic journey has provided me with a strong foundation in computer
        science and software engineering.
      </motion.p>
    </motion.section>
  );
};

export default Education;
