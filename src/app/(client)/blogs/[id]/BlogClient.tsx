"use client";

import { motion } from "framer-motion";
import "react-quill-new/dist/quill.snow.css";

interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string;
  tags?: string[];
  date: string;
}

export default function BlogClient({ blog }: { blog: Blog }) {
  return (
    <motion.div
      className="flex flex-col min-h-screen dark:text-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-grow md:px-16 md:py-28 p-8 space-y-10">
        <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-4">
          {blog.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          {new Date(blog.date).toLocaleDateString()}
        </p>
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div
          className="prose dark:prose-invert max-w-none ql-editor ql-snow"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </motion.div>
  );
}
