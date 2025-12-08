"use client";
import { motion } from "framer-motion";

export interface ExperienceData {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
}

import Timeline from "@/components/Timeline";
import TimelineItem from "@/components/TimelineItem";
import { Briefcase } from "lucide-react";

const Experience = ({
  experiences = [],
}: {
  experiences: ExperienceData[];
}) => {
  const isLoading = false;

  return (
    <motion.section
      id="experiences"
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
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        My Experience.
      </motion.h2>

      <div className="mt-4">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading experiences...</p>
        ) : (
          <Timeline>
            {experiences.map((exp, index) => (
              <TimelineItem
                key={exp.id}
                date={exp.duration}
                title={exp.role}
                subtitle={exp.company}
                isLeft={index % 2 === 0}
                icon={<Briefcase size={16} />}
                description={
                  exp.description &&
                  Array.isArray(exp.description) && (
                    <ul className="list-disc list-inside space-y-1">
                      {exp.description.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  )
                }
              />
            ))}
          </Timeline>
        )}
        {!isLoading && experiences.length === 0 && (
          <p className="text-center text-gray-500">
            No experience records found.
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
        For inquiries about my work at DSM IT PVT LTD, you can contact them at:{" "}
        <a
          href="mailto:info@dsoftmedia.com"
          className="font-semibold text-black dark:text-white hover:underline hover:text-gray-700 dark:hover:text-gray-300"
        >
          info@dsoftmedia.com
        </a>
      </motion.p>
    </motion.section>
  );
};

export default Experience;
