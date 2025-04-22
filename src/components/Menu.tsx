import { motion } from "framer-motion";
import BgShadow from "./BgShadow";
import { mobileMenu, socials } from "../assets/contants";
import {PiArrowRight } from "react-icons/pi";

export const Menu = ({
  showMenu,
}: {
  showMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const year = new Date().getFullYear()
  return (
    <BgShadow align="justify-start" onClose={() => showMenu(false)}>
      <motion.div
        initial={{ x: -400 }}
        animate={{ x: 0 }}
        exit={{ x: -400 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-r-md p-4 justify-between  gap-5 flex flex-row h-screen w-[85vw] md:w-[50vw]"
      >
        <div className="flex w-full flex-col justify-between">
          <div className="flex w-full mt-5">
            <ul className="flex h-full flex-col gap-2 w-full">
              {mobileMenu.map((menu) => (
                <li>
                  <a href={menu.url}  onClick={()=>showMenu(false)} className="text-lg w-full bg-black text-white rounded-md p-2 md:text-xl items-center font-bold flex flex-row gap-0.5">
                    <p>{menu.label}</p>
                    <span><PiArrowRight className="transition-transform duration-300" /></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full flex justify-center flex-col items-center">
            <ul className="flex gap-8 justify-center items-center">
              {socials.map((social, index) => {
                const Icon = social.icon;
                return (
                  <li key={index}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black text-xl hover:text-blue-600 transition-colors"
                    >
                      <Icon />
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="text-sm font-bold mt-3 text-center"> Copyright © {year} Nadun Malwenna. {/* Dynamic year */}</p>
          </div>
        </div>

        <div
          onClick={() => showMenu(false)}
          className="h-full w-[2rem] bg-black rounded-full text-white font-bold tracking-widest flex justify-center items-center"
        >
          <p className="rotate-90">Close</p>
        </div>
      </motion.div>
    </BgShadow>
  );
};
