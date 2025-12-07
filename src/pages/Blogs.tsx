import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SEO from "../components/SEO";

import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../AppSettings";

interface BlogItem {
  id: string;
  title: string;
  summary: string;
  tags?: string[];
  date: string;
}

export const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/blogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <SEO
        title="Blogs | NKM Hewage"
        description="Explore a collection of insightful articles and blog posts by NKM Hewage on technology, software development, and more."
        keywords="blog, articles, technology, software development, coding, web development, NKM Hewage"
        url="https://hewagenkm.com/blogs"
        ogImage="https://hewagenkm.com/og-blogs.png"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Blogs by Nadun Malwenna",
            description:
              "Explore articles and insights on software development, technology, and personal projects from Nadun Malwenna.",
            url: "https://hewagenkm.com/blogs",
            headline: "Blogs by Nadun Malwenna",
            primaryImageOfPage: "https://hewagenkm.com/og-blogs.png",
            author: {
              "@type": "Person",
              name: "Nadun Malwenna",
            },
          },
          ...blogs.map((blog) => ({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            datePublished: blog.date,
            dateModified: blog.date,
            author: {
              "@type": "Person",
              name: "Nadun Malwenna",
            },
            description: blog.summary,
            url: `https://hewagenkm.com/blogs/${blog.id}`,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://hewagenkm.com/blogs/${blog.id}`,
            },
          })),
        ]}
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
                  <Link to={`/blogs/${blog.id}`}>
                    <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {blog.summary}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {new Date(blog.date).toLocaleDateString()}
                    </p>
                  </Link>
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
