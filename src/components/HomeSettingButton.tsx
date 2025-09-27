import { motion } from "framer-motion";
import { CiSettings } from "react-icons/ci";
import { useState, useEffect } from "react";

const HomeSettingsButton = ({ onClick }: { onClick: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    //@ts-ignore
    let timeout: NodeJS.Timeout;

    const handleMouseMove = () => {
      setIsVisible(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsVisible(false), 3000); // fade out after 3s of inactivity
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Set initial fade out timer
    timeout = setTimeout(() => setIsVisible(false), 2000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: isVisible ? 1 : 0 }}
      whileHover={{ scale: 1.1, rotate: 15, opacity: 1 }}
      whileTap={{ scale: 0.95, rotate: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="fixed bottom-5 right-5 bg-black text-white rounded-full p-1.5 dark:bg-white dark:text-black shadow-lg cursor-pointer z-50"
      aria-label="Settings"
    >
      <CiSettings size={30} />
    </motion.button>
  );
};

export default HomeSettingsButton;
