"use client";
import { motion, Variants } from "framer-motion";
import { services } from "../assets/contants";
import ServiceCard from "../components/ServiceCard";

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

export default function Services() {
  return (
    <motion.section
      id="services"
      className="flex flex-col gap-10 py-16 max-w-7xl"
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
          What I Offer.
        </motion.h2>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-600 dark:text-gray-300 md:text-lg max-w-2xl"
        >
          I provide a range of services to help bring your digital ideas to
          life, from concept to deployment.
        </motion.p>
      </motion.div>

      {/* Services Grid */}
      <motion.ul
        className="flex flex-row flex-wrap justify-center items-stretch gap-8 mt-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((service, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            className="rounded-2xl h-full flex flex-col"
          >
            <ServiceCard
              title={service.title}
              description={service.description}
              icon={service.icon}
              items={service.items}
              color={service.color}
            />
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
}
