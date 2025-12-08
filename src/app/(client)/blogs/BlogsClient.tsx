"use client";

import { motion } from "framer-motion";
import BlogCard from "@/components/BlogCard";
import { useRouter } from "next/navigation";

export interface BlogItem {
  id: string;
  title: string;
  summary: string;
  tags?: string[];
  date: string;
}

interface BlogsClientProps {
  initialBlogs: BlogItem[];
  totalPages: number;
  currentPage: number;
}

export default function BlogsClient({
  initialBlogs,
  totalPages,
  currentPage,
}: BlogsClientProps) {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      router.push(`/blogs?page=${newPage}`);
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
      <div className="grow md:px-40 md:py-20 p-8">
        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-8">
            Blogs.
          </h1>
        </motion.div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {initialBlogs.map((blog) => (
            <li key={blog.id} className="h-full">
              <BlogCard
                id={blog.id}
                title={blog.title}
                summary={blog.summary}
                date={blog.date}
              />
            </li>
          ))}
          {initialBlogs.length === 0 && (
            <p>No blogs available at the moment. Please check back later!</p>
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
      </div>
    </motion.div>
  );
}
