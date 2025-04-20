import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full h-full flex flex-col gap-3 md:px-10 px-8 mt-10 md:mt-20"
    >
      <motion.h3
        className="text-2xl"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
      >
        👨🏼‍💻 About Me
      </motion.h3>

      <motion.p
        className="lg:text-3xl text-xl font-black mt-1"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
      >
       ## Hey !, I'm Nadun.👀
      </motion.p>

      <motion.p
        className="font-medium lg:mt-3 mt-1 md:text-lg  text-sm capitalize"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
      >
        I'm a passionate Full Stack Developer from Sri Lanka, dedicated to
        continuously learning and building new things every day. I love exploring
        modern web technologies, crafting clean code, and bringing creative ideas
        to life through intuitive user experiences. Whether it's frontend,
        backend, or somewhere in between, I'm always excited to take on new
        challenges and grow as a developer.
      </motion.p>
    </motion.section>
  );
}
