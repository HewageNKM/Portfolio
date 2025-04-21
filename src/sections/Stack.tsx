import { motion } from "framer-motion";  // Importing motion from framer-motion for animations
import { useState } from "react";  // Importing useState to manage state for selected category
import { stacks } from "../assets/contants";  // Importing stacks data from constants
import TechCard from "../components/TechCard";  // Importing the TechCard component for rendering tech stack cards

// Categories for the filter buttons
const categories = [
  { label: "All", value: "all" },
  { label: "Frontend", value: "fe" },
  { label: "Backend", value: "be" },
  { label: "Cloud/DevOps", value: "cd" },
  { label: "Languages", value: "lang" },
];

// Animation variants for the container (whole section)
const containerVariants = {
  hidden: { opacity: 0, y: 40 },  // Initially hidden with downward movement (creates the "hop-in" effect)
  visible: {
    opacity: 1,
    y: 0,  // Move to the original position when visible
    transition: {
      delay: 0.8, // Delay the start of the animation by 0.8 seconds
      type: "spring", // Use a spring for a bouncy effect
      stiffness: 100, // Stiffness controls the bounce's strength
      damping: 25, // Damping reduces oscillations and smooths the end of the animation
    },
  },
};

// Animation variants for individual items (e.g., text, buttons, tech cards)
const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 }, // Initially hidden with slight upward movement and scale down
  visible: {
    opacity: 1,
    y: 0,  // Move to the original position
    scale: 1,  // Scale to original size
    transition: {
      type: "spring", // Use spring for smooth motion
      stiffness: 150, // Stiffness controls the spring effect strength
      damping: 20, // Controls how quickly the motion settles
    },
  },
};

export default function Stack() {
  const [selectedCategory, setSelectedCategory] = useState("all");  // Manage selected category state

  // Filter the stacks based on selected category
  const filteredStacks =
    selectedCategory === "all"
      ? stacks  // If 'All' is selected, show all stacks
      : stacks.filter((item) => item.ct === selectedCategory);  // Filter stacks by category

  return (
    <motion.section
      className="flex flex-col gap-4 py-2 md:px-10 px-5"
      initial="hidden"
      animate="visible"
      variants={containerVariants}  // Apply container animation variants
      viewport={{ once: true }}  // Trigger animation only once when the section comes into view
    >
      {/* Title of the section with animation */}
      <motion.h2
        className="text-lg font-bold lg:text-xl"
        variants={itemVariants}  // Apply item animation variants
      >
        Things I Know.
      </motion.h2>

      {/* Description text with animation */}
      <motion.p variants={itemVariants}>
        Over the years, these are some of the tech stacks I’ve worked with and
        continue to explore.
      </motion.p>

      {/* Category buttons with animation */}
      <motion.div className="flex flex-wrap gap-3" variants={itemVariants}>
        {categories.map((cat) => (
          <motion.button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}  // Set selected category on click
            className={`px-3 py-1 rounded-md border ${
              selectedCategory === cat.value
                ? "bg-black text-white border-black"
                : "border-slate-300 hover:bg-slate-100"
            } transition-all font-medium`}
            whileTap={{ scale: 0.95 }}  // Slight scale down on tap
            whileHover={{ scale: 1.05 }}  // Slight scale up on hover
            initial={{ opacity: 0, scale: 0.95 }}  // Start with slight opacity and scale
            whileInView={{
              opacity: 1,  // Fade in when in view
              scale: 1,  // Scale to full size when in view
            }}
            transition={{
              duration: 0.5,  // Animation duration
              delay: 0.3,  // Delay before starting the animation
              type: "spring",  // Spring for smooth effect
              stiffness: 100,  // Controls the bounce effect
              damping: 25,  // Controls the smoothness of the animation
            }}
            viewport={{ once: true }}  // Trigger animation only once when in view
          >
            {cat.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Tech cards display with animation */}
      <motion.ul
        className="mt-5 flex flex-row flex-wrap gap-4"
        variants={containerVariants}  // Apply container animation variants
        initial="hidden"
        animate="visible"
      >
        {filteredStacks.map((item, index) => (
          <motion.li key={index} variants={itemVariants}>  {/* Apply item animation variants */}
            <TechCard title={item.label} img={item.img} />  {/* Render TechCard component */}
          </motion.li>
        ))}
      </motion.ul>

      {/* "And more" text with animation */}
      <motion.p
        className="text-lg text-center mt-4 font-medium"
        variants={itemVariants}  // Apply item animation variants
      >
        ... and more !
      </motion.p>
    </motion.section>
  );
}
