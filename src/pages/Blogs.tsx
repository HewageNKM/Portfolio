import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import framer-motion
import Footer from "../sections/Footer";

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
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Mock data
      const mockBlogs: BlogItem[] = [];
      setBlogs(mockBlogs);
      setIsLoading(false);
    };

    fetchBlogs();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect for setting meta data
  useEffect(() => {
    const pageTitle = "Blogs | NKM Hewage";
    const pageDescription =
      "Explore a collection of insightful articles and blog posts by NKM Hewage on technology, software development, and more.";
    const pageUrl = window.location.href;
    // const siteName = "NKM Hewage's Portfolio"; // Uncomment and set if you have a specific site name

    document.title = pageTitle;

    const setMetaTag = (
      nameOrProperty: string,
      content: string,
      isProperty = false
    ) => {
      const selector = isProperty
        ? `meta[property="${nameOrProperty}"]`
        : `meta[name="${nameOrProperty}"]`;
      let element = document.head.querySelector(
        selector
      ) as HTMLMetaElement | null;

      if (!element) {
        element = document.createElement("meta");
        if (isProperty) {
          element.setAttribute("property", nameOrProperty);
        } else {
          element.setAttribute("name", nameOrProperty);
        }
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    setMetaTag("description", pageDescription);
    setMetaTag(
      "keywords",
      "blog, articles, technology, software development, coding, web development, NKM Hewage"
    );

    // Open Graph Tags
    // setMetaTag('og:site_name', siteName, true); // Uncomment if you have a siteName
    setMetaTag("og:title", pageTitle, true);
    setMetaTag("og:description", pageDescription, true);
    setMetaTag("og:type", "website", true);
    setMetaTag("og:url", pageUrl, true);
    setMetaTag("og:image", "https://hewagenkm.com/og-image.png", true); // Add a URL to a relevant image

    // Twitter Card Tags
    setMetaTag("twitter:card", "summary", false); // Use 'summary_large_image' if you add an image
    setMetaTag("twitter:title", pageTitle, false);
    setMetaTag("twitter:description", pageDescription, false);
    setMetaTag("twitter:image", "https://hewagenkm.com/og-image.png", false); // Replace with a relevant image
  }, []); // Empty dependency array: run once on mount

  return (
    <motion.div
      className="flex flex-col min-h-screen dark:bg-black text-gray-900 dark:text-gray-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      viewport={{ once: true }}
    >
      {/* Content wrapper that grows to take up space */}
      <div className="flex-grow md:px-40 md:py-20 p-8">
        <motion.div variants={itemVariants}>
          <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-8">
            Blogs.
          </h1>
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
          </motion.div>
        )}

        {!isLoading && blogs.length > 0 && (
          <motion.ul className="space-y-6" variants={containerVariants}>
            {blogs.map((blog) => (
              <motion.li
                key={blog.id}
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                variants={itemVariants}
              >
                <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  {blog.summary}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Published on: {blog.date}
                </p>
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
      </div>

      {/* Footer pinned to bottom if content is short */}
      <Footer />
    </motion.div>
  );
};
