import { motion } from "framer-motion";
import { useState } from "react";
import { Zap, Code, Database, Smartphone, Cloud, PenTool } from "lucide-react"; // Using lucide-react for icons
import { stacks } from "../assets/contants";
import TechCard from "../components/TechCard";

// --- MAIN COMPONENT CODE ---

const categories = [
  { label: "All", value: "all", icon: Zap },
  { label: "Frontend", value: "fe", icon: Code },
  { label: "Backend", value: "be", icon: Database },
  { label: "Mobile", value: "mob", icon: Smartphone },
  { label: "Cloud / DevOps", value: "cd", icon: Cloud },
  { label: "Languages", value: "lang", icon: PenTool },
];

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

export default function App() {
  // Renamed to App for single file export
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredStacks =
    selectedCategory === "all"
      ? stacks
      : stacks.filter((item) => item.ct.includes(selectedCategory));

  return (
    <div className="font-sans">
      <motion.section
        id="stack"
        className="flex flex-col gap-10 px-4 py-16 max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        // In a single-file environment, viewport is often not needed, but keeping it for completeness
      >
        {/* Title */}
        <motion.div className="text-center space-y-4" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-extrabold dark:text-white text-gray-900">
            Things I Know
          </h2>
          <p className="text-gray-600 dark:text-gray-300 md:text-lg max-w-2xl mx-auto">
            Over the years, I’ve worked with a variety of tools, frameworks, and
            platforms to bring ideas to life. Here’s a glimpse of my toolbox.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        {/* The responsive logic is here: w-full and overflow-x-auto allows horizontal scrolling on small screens. 
            The inner div uses w-max to ensure all buttons are visible for scrolling. */}
        <motion.div
          className="w-full overflow-x-auto scrollbar-hide px-2 md:px-0" // Added horizontal padding for scroll edge on mobile
          variants={itemVariants}
        >
          <div className="flex gap-2 bg-gray-200 dark:bg-gray-800 rounded-full p-2 w-max mx-auto shadow-inner">
            {categories.map((cat) => (
              <motion.button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`flex items-center gap-1 px-4 py-2 rounded-full font-medium text-sm md:text-base whitespace-nowrap transition-all
            ${
              selectedCategory === cat.value
                ? "bg-[#111] dark:bg-gray-500 text-white shadow-lg"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
            }
          `}
                whileTap={{ scale: 0.95 }}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tech Cards Grid */}
        <motion.ul
          className="flex flex-wrap justify-center gap-6 mt-4 p-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredStacks.map((item, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -4,
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
              className="rounded-xl overflow-hidden cursor-pointer"
            >
              <TechCard title={item.label} img={item.img} />
            </motion.li>
          ))}
          {filteredStacks.length === 0 && (
            <p className="text-xl text-gray-500 dark:text-gray-400 italic mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              No stacks found for this category! Try selecting "All".
            </p>
          )}
        </motion.ul>

        {/* Footer Note */}
        <motion.p
          className="text-center text-gray-500 dark:text-gray-400 mt-3 italic"
          variants={itemVariants}
        >
          ...and always learning more 🚀
        </motion.p>
      </motion.section>
    </div>
  );
}
