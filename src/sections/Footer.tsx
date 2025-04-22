import { motion } from "framer-motion"; // For adding animations to components
import { mobileMenu, socials } from "../assets/contants";

// Variants for animating the footer when it comes into view
const footerVariants = {
  hidden: { opacity: 0, y: 10 }, // Initial state: hidden with a slight upward position
  visible: {
    opacity: 1, // Fully visible
    y: 0, // Original position
    transition: {
      duration: 0.6, // Duration of the transition
      ease: "easeOut", // Smooth easing for the transition
    },
  },
};

// Variants for animating each item in the footer (links and icons)
const itemVariants = {
  hidden: { opacity: 0, y: 10 }, // Initial state: hidden with a slight upward position
  visible: { opacity: 1, y: 0 }, // Fully visible with original position
};

const Footer = () => {
  // Get the current year for the copyright notice
  const year = new Date().getFullYear();

  return (
    <motion.footer
      className="flex flex-col mt-20 relative py-2 px-4 w-full text-center"
      initial="hidden" // Start with the "hidden" variant
      animate="visible" // Animate to the "visible" variant
      variants={footerVariants} // Apply footer-specific animation variants
      viewport={{ once: true }} // Trigger the animation only once when the footer comes into view
    >
      {/* Container for the footer content */}
      <motion.div
        className="flex flex-row md:justify-between justify-center gap-5 items-center md:gap-1 flex-wrap"
        variants={itemVariants} // Apply item-specific animation variants
      >
        {/* Navigation links */}
        <motion.ul
          className="flex flex-row font-bold text-lg items-center gap-3 md:gap-5 flex-wrap"
          variants={itemVariants} // Apply item-specific animation variants
        >
          {mobileMenu.map((menu) => (
            <motion.li variants={itemVariants}>
              <a href={menu.url}>{menu.label}.</a> {/* Home link */}
            </motion.li>
          ))}
        </motion.ul>

        {/* Social media icons */}
        <motion.ul
          className="flex flex-row items-center gap-3 md:gap-5 flex-wrap"
          variants={itemVariants} // Apply item-specific animation variants
        >
          <motion.ul variants={itemVariants} className="flex gap-8 flex-row justify-center items-center">
            {socials.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.li variants={itemVariants} key={index}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black text-xl"
                  >
                    <Icon size={30}/>
                  </a>
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.ul>
      </motion.div>

      {/* Copyright message */}
      <motion.p className="uppercase font-bold mt-5" variants={itemVariants}>
        Copyright © {year} Nadun Malwenna. {/* Dynamic year */}
      </motion.p>
    </motion.footer>
  );
};

export default Footer;
