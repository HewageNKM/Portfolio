import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Zap, Code, Database, Cloud, Wrench, Box } from "lucide-react";
import TechCard from "../components/TechCard";
import axios from "axios";
import { API_BASE_URL } from "../AppSettings";

interface TechStack {
  id: string;
  name: string;
  category: string;
  icon: string;
}

// Updated categories to match database values
const categories = [
  { label: "All", value: "all", icon: Zap },
  { label: "Frontend", value: "Frontend", icon: Code },
  { label: "Backend", value: "Backend", icon: Database },
  { label: "Database", value: "Database", icon: Database }, // Re-using Database icon
  { label: "DevOps", value: "DevOps", icon: Cloud },
  { label: "Tools", value: "Tools", icon: Wrench },
  { label: "Other", value: "Other", icon: Box },
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

export default function Stack() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [stacks, setStacks] = useState<TechStack[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStacks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/tech-stacks`);
        setStacks(response.data);
      } catch (error) {
        console.error("Error fetching tech stacks:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStacks();
  }, []);

  const filteredStacks =
    selectedCategory === "all"
      ? stacks
      : stacks.filter((item) => item.category === selectedCategory);

  return (
    <div className="font-sans">
      <motion.section
        id="stack"
        className="flex flex-col gap-10 px-4 py-16 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
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
        <motion.div className="w-full px-2 md:px-0" variants={itemVariants}>
          <div className="bg-gray-200 dark:bg-gray-800 rounded-full p-2 shadow-inner w-full max-w-max mx-auto">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
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
          </div>
        </motion.div>

        {/* Tech Cards Grid */}
        {isLoading ? (
          <p className="text-center text-gray-500">Loading tech stack...</p>
        ) : (
          <motion.ul
            className="flex flex-wrap justify-center gap-6 mt-4 p-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredStacks.map((item) => (
              <motion.li
                key={item.id}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -4,
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                }}
                className="rounded-xl overflow-hidden cursor-pointer"
              >
                <TechCard title={item.name} img={item.icon} />
              </motion.li>
            ))}
            {filteredStacks.length === 0 && (
              <p className="text-lg text-gray-500 dark:text-gray-400 italic mt-8 p-4">
                No stacks found for this category!
              </p>
            )}
          </motion.ul>
        )}

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
