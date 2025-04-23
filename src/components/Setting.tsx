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
  const { setFont, font, setTheme, theme } = useTheme();

  console.log(theme,font)
  return (
    <BgShadow align="justify-center" onClose={() => showSetting(false)}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-black dark:text-white p-6 rounded-2xl shadow-lg flex-col flex items-start w-[90vw] md:w-[400px] max-w-full"
      >
        <h3 className="text-xl font-bold flex flex-row items-center gap-2 mb-4">
          <CiSettings size={24} /> Settings
        </h3>

        <label className="w-full text-base font-medium mt-4">
          <div className="flex items-center gap-2 mb-1">
            <BiSun size={20} />
            Theme
          </div>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full px-4 py-2 mt-1 bg-gray-100 dark:bg-zinc-800 text-black dark:text-white border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
          >
            {themes.map((theme, index) => (
              <option key={index} value={theme.value}>
                {theme.label}
              </option>
            ))}
          </select>
        </label>

        <label className="w-full text-base font-medium mt-4">
          <div className="flex items-center gap-2 mb-1">
            <BiFont size={20} />
            Font
          </div>
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className="w-full px-4 py-2 mt-1 bg-gray-100 dark:bg-zinc-800 text-black dark:text-white border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
          >
            {fonts.map((font, index) => (
              <option key={index} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </label>

        <div className="w-full mt-8 flex justify-end">
          <button
            onClick={() => showSetting(false)}
            className="flex group items-center gap-1 px-4 py-2 bg-black rounded-md font-bold transition-opacitybg-black text-white hover:opacity-80 dark:bg-white dark:text-black"
          >
            <span className="font-bold">Close</span>{" "}
            <BsArrowRight className="group-hover:translate-x-2  transition-transform duration-300" />
          </button>
        </div>
      </div>
    </BgShadow>
  );
};
