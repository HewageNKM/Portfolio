import { motion } from "framer-motion";

export default function BgShadow({ children, onClose }:{onClose:()=>void,children:React.ReactNode}) {
  return (
    <motion.section
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-screen fixed flex justify-center items-center top-0 left-0 bg-black/30 backdrop-blur-sm z-50"
    >
      {children}
    </motion.section>
  );
}
