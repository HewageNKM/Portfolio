"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { API_BASE_URL } from "@/AppSettings";

interface BlogItem {
  id: string;
  title: string;
  summary: string;
  tags?: string[];
  date: string;
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/blogs?page=${currentPage}&limit=${limit}`
        );
        if (Array.isArray(response.data)) {
          setBlogs(response.data);
          setTotalPages(1);
        } else {
          setBlogs(response.data.data);
          setTotalPages(response.data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
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
          <>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs.map((blog) => (
                <li
                  key={blog.id}
                  className="border p-4 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <Link href={`/blogs/${blog.id}`}>
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
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 gap-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                >
                  Previous
                </button>
                <span className="text-gray-600 dark:text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
