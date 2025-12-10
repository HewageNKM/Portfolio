"use client";
import { motion } from "framer-motion";
import { MenuItems } from "../assets/contants";
import { CgMenu } from "react-icons/cg";

import { CiSettings } from "react-icons/ci";
import Link from "next/link";
import Image from "next/image";

const Header = ({
  showMenu,
  showSetting,
}: {
  showSetting: React.Dispatch<React.SetStateAction<boolean>>;
  showMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex w-full py-4 z-50"
    >
      <nav className="w-full">
        <ul className="flex flex-row relative items-center justify-between w-full px-5 lg:px-20">
          {/* Logo */}
          <motion.li
            className="flex flex-row gap-3 items-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link href="/" className="">
              <Image
                src="/logo.webp"
                alt="NM - Nadun Malwenna Logo"
                width={70}
                height={70}
                unoptimized
              />
            </Link>
            <div className="flex items-center gap-2 lg:hidden">
              <button
                className="block dark:text-white text-black mr-2"
                onClick={() => showSetting(true)}
              >
                <CiSettings size={28} />
              </button>
              <button
                className="block dark:text-white text-black"
                onClick={() => showMenu(true)}
              >
                <CgMenu size={30} />
              </button>
            </div>
          </motion.li>

          {/* Navigation links */}
          <motion.li
            className="lg:flex dark:text-white text-black flex-row md:gap-5 gap-3 hidden lg:text-lg text-xs font-bold items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {MenuItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.url}
                className="relative group h-7 transition-all uppercase duration-300"
              >
                {item.label}.
                <span className="block h-0.5 w-0 bg-black dark:bg-white group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
            <motion.button
              whileHover={{ rotate: 45 }}
              onClick={() => showSetting(true)}
              className="ml-2"
            >
              <CiSettings size={24} />
            </motion.button>
          </motion.li>
        </ul>
      </nav>
    </motion.header>
  );
};

export default Header;
