import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SEO from "../components/SEO";

interface BlogItem {
  id: string;
  title: string;
  summary: string;
  date: string;
}

export const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching blogs
    setTimeout(() => {
      setBlogs([]);
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      <SEO
        title="Blogs | NKM Hewage"
        description="Explore a collection of insightful articles and blog posts by NKM Hewage on technology, software development, and more."
        keywords="blog, articles, technology, software development, coding, web development, NKM Hewage"
        url="https://hewagenkm.com/blogs"
      />
      <motion.div
        className="flex flex-col min-h-screen dark:text-gray-100"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, duration: 0.5 },
          },
        }}
        viewport={{ once: true }}
      >
        <div className="flex-grow md:px-40 md:py-20 p-8">
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-8">
              Blogs.
            </h1>
          </motion.div>

          {isLoading ? (
            <p>Loading blogs...</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs.map((blog) => (
                <li
                  key={blog.id}
                  className="border p-4 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {blog.summary}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {new Date(blog.date).toLocaleDateString()}
                  </p>
                </li>
              ))}
              {!isLoading && blogs.length === 0 && (
                <p>
                  No blogs available at the moment. Please check back later!
                </p>
              )}
            </ul>
          )}
        </div>
      </motion.div>
    </>
  );
};
