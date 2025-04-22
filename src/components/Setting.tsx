import { CiSettings } from "react-icons/ci";
import { themes } from "../assets/contants";
import BgShadow from "./BgShadow";
import { BiFont, BiSun } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

export const Setting = ({ showSetting }: { showSetting: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <BgShadow  onClose={() => showSetting(false)}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded-2xl shadow-lg flex-col flex items-start w-[90vw] md:w-[400px] max-w-full">
        <h3 className="text-xl font-bold flex flex-row items-center gap-2 mb-4">
          <CiSettings size={24} /> Settings
        </h3>

        <label className="w-full text-base font-medium mt-4">
          <div className="flex items-center gap-2 mb-1">
            <BiSun size={20} />
            Theme
          </div>
          <select
            className="w-full px-4 py-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-all"
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
            className="w-full px-4 py-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-all"
          >
            {themes.map((theme, index) => (
              <option key={index} value={theme.value}>
                {theme.label}
              </option>
            ))}
          </select>
        </label>

        <div className="w-full mt-8 flex justify-end">
          <button
            onClick={() => showSetting(false)}
            className="flex group items-center transition-opacity gap-1 bg-black text-white px-4 py-2 rounded-md hover:opacity-80"
          >
            Close <BsArrowRight className="group-hover:translate-x-2 transition-transform duration-300"/>
          </button>
        </div>
      </div>
    </BgShadow>
  );
};
