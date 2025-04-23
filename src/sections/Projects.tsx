import { useState } from "react";
import { PiArrowRight } from "react-icons/pi";
import { SiGithub } from "react-icons/si";
import { motion } from "framer-motion";

export default function Projects() {
  //@ts-ignore
  const [projetc, setProjects] = useState([]);  // State to manage projects (empty array initially)

  return (
    <motion.section
      id="works"
      className="flex flex-col mt-8 md:mt-12 gap-4 py-2 md:px-10 px-5"
      initial={{ opacity: 0 }}  // Start with hidden opacity
      whileInView={{ opacity: 1 }}  // Fade in when in view
      transition={{ duration: 0.8 }}  // Animation duration for opacity
      viewport={{ once: true }}  // Trigger animation only once when in view
    >
      {/* Section Heading with animation */}
      <motion.h2
        className="text-lg dark:text-white text-black font-bold lg:text-xl"
        initial={{ y: -20, opacity: 0 }}  // Start with slight upward movement and hidden opacity
        whileInView={{ y: 0, opacity: 1 }}  // Move to original position and fade in
        transition={{ duration: 0.6 }}  // Animation duration for heading
        viewport={{ once: true }}  // Trigger animation only once
      >
        My Works.
      </motion.h2>

      {/* Display message if there are no projects */}
      {projetc.length <= 0 && (
        <motion.p
          className="text-center dark:text-white text-black mt-3 text-lg font-bold"
          initial={{ opacity: 0 }}  // Start with hidden opacity
          whileInView={{ opacity: 1 }}  // Fade in when in view
          transition={{ duration: 0.6 }}  // Animation duration for message
          viewport={{ once: true }}  // Trigger animation only once
        >
          No Projects!
        </motion.p>
      )}

      {/* Show All button to GitHub with smooth animation */}
      <div className="w-full flex mt-3 gap-5 flex-row justify-center">
        <motion.a
          href="https://github.com/HewageNKM"
          target="_blank"
          className="group dark:bg-white dark:text-black bg-black items-center mt-5 gap-2 rounded-md py-1 px-4 flex-row flex text-white font-medium hover:opacity-70"
          initial={{ opacity: 0 }}  // Start with hidden opacity
          whileInView={{ opacity: 1 }}  // Fade in when in view
          transition={{ duration: 0.8, delay: 0.4 }}  // Animation duration with delay
          viewport={{ once: true }}  // Trigger animation only once
        >
          <SiGithub /> {/* GitHub icon */}
        </motion.a>
        <motion.a
          href="https://github.com/HewageNKM"
          target="_blank"
          className="group dark:bg-white dark:text-black bg-black items-center mt-5 gap-2 rounded-md py-1 px-4 flex-row flex text-white font-medium hover:opacity-70"
          initial={{ opacity: 0 }}  // Start with hidden opacity
          whileInView={{ opacity: 1 }}  // Fade in when in view
          transition={{ duration: 0.8, delay: 0.4 }}  // Animation duration with delay
          viewport={{ once: true }}  // Trigger animation only once
        >
          <span className="font-bold">Show All</span>
          {/* Arrow icon with hover animation */}
          <PiArrowRight
            className="font-bold transition-transform duration-300 group-hover:translate-x-2"  // Animate on hover
            size={20}
          />
        </motion.a>
      </div>
    </motion.section>
  );
}
