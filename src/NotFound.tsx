import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="flex items-center justify-center h-screen bg-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-md"
      >
        <motion.h1
          className="text-6xl md:text-8xl font-bold text-black mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          404
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Oops! The page you’re looking for doesn’t exist.
        </motion.p>

        <Link
          to="/"
          className="inline-block px-6 py-2 text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
        >
          Go Home
        </Link>
      </motion.div>
    </main>
  );
};

export default NotFound;
