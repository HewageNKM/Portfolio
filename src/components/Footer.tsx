"use client";
import { motion, Variants } from "framer-motion"; // For adding animations to components
import { MenuItems, socials } from "../assets/contants";

// Variants for animating the footer when it comes into view
const footerVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Variants for animating each item in the footer (links and icons)
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      className="flex dark:text-white text-black flex-col mt-10 md:mt-20 md:px-16 relative px-4 w-full text-center"
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      viewport={{ once: true }}
    >
      {/* Container for the footer content */}
      <motion.div
        className="flex flex-row md:justify-between justify-center gap-5 items-center md:gap-1 flex-wrap"
        variants={itemVariants}
      >
        {/* Navigation links */}
        <motion.ul
          className="flex flex-row font-bold justify-center md:text-lg text-sm items-center gap-3 md:gap-5 flex-wrap"
          variants={itemVariants}
        >
          {MenuItems.map((menu, index) => (
            <motion.li variants={itemVariants} key={index}>
              <a href={menu.url}>{menu.label}.</a>
            </motion.li>
          ))}
        </motion.ul>

        {/* Social media icons */}
        <motion.ul
          className="flex flex-row items-center gap-3 md:gap-5 flex-wrap"
          variants={itemVariants}
        >
          <motion.ul
            variants={itemVariants}
            className="flex gap-5 flex-row justify-center items-center"
          >
            {socials.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.li variants={itemVariants} key={index}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black dark:text-white text-xl"
                  >
                    <Icon size={20} />
                  </a>
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.ul>
      </motion.div>

      {/* Copyright message */}
      <motion.p
        className="uppercase font-bold md:text-lg text-sm text-center mt-5"
        variants={itemVariants}
      >
        Copyright © {year} Nadun Malwenna.
      </motion.p>

      {/* reCAPTCHA disclaimer */}
      <motion.p
        className="text-xs text-gray-500 dark:text-gray-400 mt-3 mb-2 max-w-md mx-auto leading-snug"
        variants={itemVariants}
      >
        This site is protected by reCAPTCHA and the Google{" "}
        <a href="/privacy-policy" className="underline hover:text-primary">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="/terms" className="underline hover:text-primary">
          Terms of Service
        </a>{" "}
        apply.
      </motion.p>
    </motion.footer>
  );
};

export default Footer;
