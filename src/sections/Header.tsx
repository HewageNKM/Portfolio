import { useState } from "react";
import { motion } from "framer-motion";
import { VscMenu } from "react-icons/vsc";
import { menu } from "../assets/contants";
import { CiSettings } from "react-icons/ci";

const Header = ({showSetting}:{showSetting:React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex w-full py-4 z-50"
    >
      <nav className="w-full">
        <ul className="flex flex-row relative items-center justify-between w-full md:px-10 px-5">
          {/* Logo */}
          <motion.li
            className="flex flex-row gap-3 items-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <a
              href="/"
              className="lg:text-3xl text-2xl font-extrabold tracking-wide"
            >
              NM.
            </a>
            <button
              className="lg:hidden block"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <VscMenu size={30} />
            </button>
          </motion.li>

          {/* Navigation links */}
          <motion.li
            className="lg:flex flex-row md:gap-5 gap-3 hidden lg:text-lg text-xs font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {menu.map((item) => (
              <motion.a
                key={item.label}
                href={item.url}
                className="relative group h-7 transition-all uppercase duration-300"
              >
                {item.label}.
                <span className="block h-0.5 w-0 bg-black group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </motion.li>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              className="lg:hidden absolute top-16 left-0 right-0 bg-white shadow-lg p-4 rounded-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ul className="flex flex-col gap-3">
                {menu.map((item) => (
                  <li key={item.label} className="text-lg font-bold">
                    <a href={item.url}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Dark Mode Switch */}
          <motion.button
          onClick={()=>showSetting(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute top-1 hover:cursor-pointer -right-5 lg:-right-32 w-20 h-20"
          >
            <figure className="w-20 h-20">
              <CiSettings size={30} />
            </figure>
          </motion.button>
        </ul>
      </nav>
    </motion.header>
  );
};

export default Header;
