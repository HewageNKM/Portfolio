"use client";
import { motion } from "framer-motion";
import BgShadow from "./BgShadow";
import {MenuItems, socials } from "../assets/contants";
import { PiArrowRight } from "react-icons/pi";

const containerVariants = {
  hidden: { x: -400, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 35,
      staggerChildren: 0.08,
    },
  },
  exit: {
    x: -400,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "tween", ease: "easeOut", duration: 0.6, delay: 0.5 },
  },
};

export const Menu = ({
  showMenu,
}: {
  showMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const year = new Date().getFullYear();

  return (
    <BgShadow align="justify-start" onClose={() => showMenu(false)}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#111111] dark:text-white rounded-r-md p-4 justify-between gap-5 flex flex-row h-screen w-[85vw] md:w-[50vw]"
      >
        <div className="flex w-full flex-col justify-between">
          <div className="flex w-full mt-5">
            <ul className="flex h-full flex-col gap-2 w-full">
              {MenuItems.map((menu, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <a
                    href={menu.url}
                    onClick={() => showMenu(false)}
                    className="text-lg w-full bg-black text-white dark:bg-white dark:text-black rounded-md p-2 md:text-xl items-center font-bold flex flex-row gap-0.5 transition-colors"
                  >
                    <p>{menu.label}</p>
                    <span>
                      <PiArrowRight className="transition-transform duration-300" />
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            className="w-full flex justify-center flex-col items-center"
            variants={itemVariants}
          >
            <ul className="flex gap-8 justify-center items-center">
              {socials.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.li
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black dark:text-white text-xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <Icon />
                    </a>
                  </motion.li>
                );
              })}
            </ul>
            <p className="text-sm font-bold mt-3 text-center text-black dark:text-white">
              © {year} Nadun Malwenna.
            </p>
          </motion.div>
        </div>

        {/* Close Button */}
        <motion.div
          onClick={() => showMenu(false)}
          className="h-full w-[2rem] bg-black dark:bg-white dark:text-black text-white font-bold tracking-widest flex justify-center items-center cursor-pointer rounded-full"
          whileHover={{ scale: 1.1, backgroundColor: "#1a1a1a" }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <p className="rotate-90">Close</p>
        </motion.div>
      </motion.div>
    </BgShadow>
  );
};
