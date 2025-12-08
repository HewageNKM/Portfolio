"use client";
import { motion } from "framer-motion";

export default function BgShadow({ children, onClose ,align}:{onClose:()=>void,children:React.ReactNode,align:"justify-start" | "justify-center"}) {
  return (
    <motion.section
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`w-full h-screen fixed flex ${align} items-center top-0 left-0 bg-black/30 backdrop-blur-sm z-50`}
    >
      {children}
    </motion.section>
  );
}
