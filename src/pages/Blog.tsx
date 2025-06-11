import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import framer-motion

// Define an interface for the blog post structure
interface BlogItem {
  id: string;
  title: string;
  summary: string;
  date: string;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger children animations
      duration: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
    },
  },
};

export const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true

  useEffect(() => {
    // Simulate fetching blog posts
    setIsLoading(true);
    const fetchBlogs = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Mock data
      const mockBlogs: BlogItem[] = [];
      setBlogs(mockBlogs);
      setIsLoading(false);
    };

    fetchBlogs();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <motion.main
      className="flex flex-col min-h-screen dark:bg-black md:px-40 md:py-20 p-8 text-gray-900 dark:text-gray-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      viewport={{ once: true }}
    >
      <motion.div variants={itemVariants}>
        <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-8">Blogs.</h1>
      </motion.div>

      {isLoading && (
        <motion.div
          className="flex flex-col items-center justify-center h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xl">Loading posts...</p>
          {/* You could add a spinner component here */}
        </motion.div>
      )}

      {!isLoading && blogs.length > 0 && (
        <motion.ul
          className="space-y-6"
          variants={containerVariants} // Use container variants for stagger effect on children
        >
          {blogs.map((blog) => (
            <motion.li
              key={blog.id}
              className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              variants={itemVariants} // Apply item variants to each blog post
            >
              <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">{blog.summary}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Published on: {blog.date}</p>
            </motion.li>
          ))}
        </motion.ul>
      )}

      {!isLoading && blogs.length === 0 && (
        <motion.div
          className="flex flex-col items-center justify-center h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xl">No Posts to Display</p>
        </motion.div>
      )}
    </motion.main>
  );
};
