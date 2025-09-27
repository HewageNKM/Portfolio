import { ReactNode, useState, useEffect, useRef } from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";
import { AnimatePresence, motion } from "framer-motion";
import { Setting } from "../components/Setting";
import { Menu } from "../components/Menu";
import HomeSettingsButton from "../components/HomeSettingButton";

interface PageLayoutProps {
  children: ReactNode;
}

interface Particle {
  x: number;
  y: number;
  z: number; // depth
  size: number;
  delay: number;
  dx: number;
  dy: number;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const [showSetting, setShowSetting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const generateParticles = () => {
    if (!containerRef.current) return [];
    const { clientWidth, clientHeight } = containerRef.current;

    return Array.from({ length: 60 }).map(() => {
      const z = Math.random(); // 0 = far, 1 = close
      return {
        x: Math.random() * clientWidth,
        y: Math.random() * clientHeight,
        z,
        size: 1 + z * 12, // closer particles appear bigger
        delay: Math.random() * 5,
        dx: (Math.random() - 0.5) * 60 * z, // move more for closer particles
        dy: (Math.random() - 0.5) * 60 * z,
      };
    });
  };

  useEffect(() => {
    setParticles(generateParticles());

    const interval = setInterval(() => {
      setParticles(generateParticles());
    }, 20000) 

    const handleResize = () => setParticles(generateParticles());
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main
      className="relative flex flex-col w-full md:gap-5 gap-3 font-inter overflow-hidden perspective-1000"
      ref={containerRef}
    >
      {/* 3D Background Particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            initial={{ x: p.x, y: p.y, scale: 0, opacity: 0 }}
            animate={{
              x: [p.x, p.x + p.dx, p.x],
              y: [p.y, p.y + p.dy, p.y],
              scale: [p.z, p.z + 0.3, p.z], // simulate depth
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: "currentColor",
              filter: `blur(${(1 - p.z) * 2}px)`, // distant particles slightly blurred
            }}
          />
        ))}
      </div>

      {/* Page Content */}
      <Header showMenu={setShowMenu} showSetting={setShowSetting} />
      {children}
      <Footer />

      {/* Floating UI Components */}
      <AnimatePresence>{showSetting && <Setting showSetting={setShowSetting} />}</AnimatePresence>
      <AnimatePresence>{showMenu && <Menu showMenu={setShowMenu} />}</AnimatePresence>
      <AnimatePresence>
        <HomeSettingsButton onClick={() => setShowSetting(true)} />
      </AnimatePresence>
    </main>
  );
};

export default PageLayout;
