"use client";

import { motion } from "framer-motion";
import BlogCard from "@/components/BlogCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  search?: string;
}

export default function BlogsClient({
  initialBlogs,
  totalPages,
  currentPage,
  search,
}: BlogsClientProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(search || "");

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      const params = new URLSearchParams();
      params.set("page", newPage.toString());
      if (search) params.set("search", search);
      router.push(`/blogs?${params.toString()}`);
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
          className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
        >
          <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold">Blogs.</h1>

          {/* Search Bar */}
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search blogs..."
                className="w-full px-4 py-2 pl-10 bg-gray-200 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-black outline-none transition-all dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const params = new URLSearchParams();
                    params.set("page", "1");
                    if (searchTerm.trim()) params.set("search", searchTerm);
                    router.push(`/blogs?${params.toString()}`);
                  }
                }}
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button
              onClick={() => {
                const params = new URLSearchParams();
                params.set("page", "1");
                if (searchTerm.trim()) params.set("search", searchTerm);
                router.push(`/blogs?${params.toString()}`);
              }}
              className="px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg hover:opacity-80 transition-opacity font-medium"
            >
              Search
            </button>
          </div>
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
            <div className="col-span-1 md:col-span-2 text-center py-20 text-gray-500 dark:text-gray-400">
              <p className="text-xl mb-2">
                No blogs found matching &quot;{search}&quot;
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="text-black hover:underline"
              >
                Clear search
              </button>
            </div>
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
