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
      className="flex flex-col gap-10 px-4 py-16 max-w-7xl mx-auto w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      viewport={{ once: true }}
    >
      {/* Title */}
      <motion.div className="space-y-4" variants={itemVariants}>
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold dark:text-white text-black"
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4"
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
