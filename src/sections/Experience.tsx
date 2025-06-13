import { motion } from "framer-motion";
import { experiences } from "../assets/contants";


const Experience = () => {
  return (
    <motion.section
      id="experience"
      className="w-full flex flex-col py-4 gap-8 md:px-10 px-4 mt-10"
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

      {/* Timeline Container */}
      <div className="mt-4"> {/* Adjusted spacing, mb will be on items */}
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            // Each item is a flex container: [Timeline Graphics | Content Card]
            className="flex relative mb-10 last:mb-0" // `relative` for positioning child elements like the triangle
            initial={{ opacity: 0, y: 40 }} // Animate from bottom-up
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }} // Staggered animation
            viewport={{ once: true }}
          >
            {/* Left side: Timeline dot and connecting line */}
            <div className="flex flex-col items-center w-16 md:w-20 flex-shrink-0"> {/* Fixed width for timeline elements */}
              {/* Timeline Dot (Node) - Animate the first one */}
              <motion.div
                className={`w-5 h-5 md:w-6 md:h-6 rounded-full z-10 ring-4 ring-white dark:ring-black shadow-md ${
                  index === 0 ? 'bg-black dark:bg-white' : 'bg-gray-400 dark:bg-gray-500'
                }`}
                {...(index === 0 && { // Apply animation only to the first (latest) node
                  animate: { scale: [1, 1.15, 1] }, // Scale up and down
                  transition: { duration: 1.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" } // Smooth, repeating pulse
                })}
              />
              {/* Vertical Line connecting to the next dot (if not the last item) */}
              {index < experiences.length - 1 && (
                <div className="flex-grow w-0.5 md:w-1 bg-gray-300 dark:bg-gray-600 mt-2"></div>
              )}
            </div>

            {/* Right side: Experience Content Card */}
            <div className="flex-grow pb-1"> {/* pb-1 to ensure line below has space if content is short */}
                {/* Card is pulled left and up slightly to connect visually with the dot */}
                <div className="p-5 md:p-6 rounded-lg bg-gray-50 dark:bg-zinc-800 shadow-xl dark:shadow-zinc-700/50 ml-[-20px] md:ml-[-24px] mt-[-8px] md:mt-[-10px] relative">
                    {/* Triangle connector pointing from card to the dot */}
                    <div className="absolute left-[-7px] top-[18px] md:top-[22px] w-4 h-4 bg-gray-50 dark:bg-zinc-800 transform rotate-45 -z-0"></div>
                    
                    <h3 className="text-xl font-semibold dark:text-white text-black mb-1">
                        {exp.role}
                    </h3>
                    <p className="text-md font-medium text-gray-700 dark:text-gray-300">
                        {exp.company}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-3">
                        {exp.duration}
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                        {exp.description.map((point, i) => (<li key={i}>{point}</li>))}
                    </ul>
                </div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.p className="text-center md:text-left text-sm md:text-base dark:text-gray-300 text-gray-700 mt-4"
        initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: experiences.length * 0.2 + 0.2 }} viewport={{ once: true }}>
        For inquiries about my work at DSM IT PVT LTD, you can contact them at: <a href="mailto:info@dsoftmedia.com" className="font-semibold text-black dark:text-white hover:underline hover:text-gray-700 dark:hover:text-gray-300">info@dsoftmedia.com</a>
      </motion.p>
    </motion.section>
  );
};

export default Experience;