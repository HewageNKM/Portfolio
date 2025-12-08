"use client";
import { CiSettings } from "react-icons/ci";
import { fonts, themes } from "../assets/contants";
import BgShadow from "./BgShadow";
import { BiFont, BiSun } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { useTheme } from "../context/ThemeContext";

export const Setting = ({
  showSetting,
}: {
  showSetting: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // @ts-ignore
  const { setFont, font, setTheme, theme } = useTheme();

  return (
    <BgShadow align="justify-center" onClose={() => showSetting(false)}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white
          dark:bg-[#111111]
         dark:text-white p-6 rounded-2xl shadow-xl flex flex-col w-[90vw] md:w-[400px] max-w-full transition-all"
      >
        {/* Header */}
        <h3 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <CiSettings size={26} />
          Settings
        </h3>

        {/* Theme Selector */}
        <div className="w-full mb-5">
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <BiSun size={18} />
            Theme
          </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-900 text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
          >
            {themes.map((theme, index) => (
              <option key={index} value={theme.value}>
                {theme.label}
              </option>
            ))}
          </select>
        </div>

        {/* Font Selector */}
        <div className="w-full mb-8">
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <BiFont size={18} />
            Font
          </label>
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-900 text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
          >
            {fonts.map((font, index) => (
              <option key={index} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>

        {/* Footer */}
        <div className="w-full flex justify-end">
          <button
            onClick={() => showSetting(false)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition-all group"
          >
            Close
            <BsArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />
          </button>
        </div>
      </div>
    </BgShadow>
  );
};
