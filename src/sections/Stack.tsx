import { motion } from "framer-motion";
import { useState } from "react";
import { stacks } from "../assets/contants";
import TechCard from "../components/TechCard";

const categories = [
  { label: "All", value: "all" },
  { label: "Frontend", value: "fe" },
  { label: "Backend", value: "be" },
  { label: "Cloud/DevOps", value: "cd" },
  { label: "Languages", value: "lang" },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.8,
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export default function Stack() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredStacks =
    selectedCategory === "all"
      ? stacks
      : stacks.filter((item) => item.ct === selectedCategory);

  return (
    <motion.section
      className="flex flex-col gap-4 py-2 md:px-10 px-5"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2
        className="text-lg font-bold lg:text-xl"
        variants={itemVariants}
      >
        Things I Know.
      </motion.h2>
      <motion.p variants={itemVariants}>
        Over the years, these are some of the tech stacks I’ve worked with and
        continue to explore.
      </motion.p>

      <motion.div className="flex flex-wrap gap-3" variants={itemVariants}>
        {categories.map((cat) => (
          <motion.button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-3 py-1 rounded-md border ${
              selectedCategory === cat.value
                ? "bg-black text-white border-black"
                : "border-slate-300 hover:bg-slate-100"
            } transition-all font-medium`}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            {cat.label}
          </motion.button>
        ))}
      </motion.div>

      <motion.ul
        className="mt-5 flex flex-row flex-wrap gap-4"
        variants={containerVariants}
      >
        {filteredStacks.map((item, index) => (
          <motion.li key={index} variants={itemVariants}>
            <TechCard title={item.label} img={item.img} />
          </motion.li>
        ))}
      </motion.ul>

      <motion.p
        className="text-lg text-center mt-4 font-medium"
        variants={itemVariants}
      >
        ... and more !
      </motion.p>
    </motion.section>
  );
}
