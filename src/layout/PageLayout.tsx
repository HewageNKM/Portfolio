import { ReactNode, useState, useRef } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { AnimatePresence } from "framer-motion";
import { Setting } from "../components/Setting";
import { Menu } from "../components/Menu";
import HomeSettingsButton from "../components/HomeSettingButton";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const [showSetting, setShowSetting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main
      ref={containerRef}
      className="relative flex flex-col w-full md:gap-5 gap-3 font-inter overflow-hidden perspective-1000
                 bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200
                 bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.02)_0px,rgba(0,0,0,0.02)_1px,transparent_1px,transparent_20px)]
                 dark:bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.02)_0px,rgba(255,255,255,0.02)_1px,transparent_1px,transparent_20px)]
                 bg-fixed"
    >
      {/* Page Content */}
      <Header showMenu={setShowMenu} showSetting={setShowSetting} />
      {children}
      <Footer />

      {/* Floating UI Components */}
      <AnimatePresence>
        {showSetting && <Setting showSetting={setShowSetting} />}
      </AnimatePresence>
      <AnimatePresence>
        {showMenu && <Menu showMenu={setShowMenu} />}
      </AnimatePresence>
      <AnimatePresence>
        <HomeSettingsButton onClick={() => setShowSetting(true)} />
      </AnimatePresence>
    </main>
  );
};

export default PageLayout;
