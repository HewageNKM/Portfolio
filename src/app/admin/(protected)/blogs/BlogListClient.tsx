"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";
import { Pencil, PlusIcon, Trash2 } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  date: string;
}

export default function BlogListClient() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchBlogs = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(
        `/blogs?page=${page}&limit=${limit}`
      );
      if (Array.isArray(response.data)) {
        // Fallback for non-paginated response if any
        setBlogs(response.data);
        setTotalPages(1);
      } else {
        setBlogs(response.data.data);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      // Handled by interceptor
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const token = await auth.currentUser?.getIdToken();
      await apiClient.delete(`/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Blog deleted");
      // Refresh current page
      fetchBlogs(currentPage);
    } catch (error) {
      // Handled by interceptor
    }
  };

  return (
    <div className="p-8 min-h-screen text-neutral-900 dark:text-neutral-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Blogs</h1>
        <Link
          href="/admin/blogs/new"
          className="bg-neutral-900 dark:bg-white flex flex-row gap-1 items-center dark:text-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
        >
          <PlusIcon size={18} /> New
        </Link>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-neutral-50 dark:bg-neutral-800/50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {blogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="hover:bg-neutral-50/50 dark:hover:bg-neutral-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {blog.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-neutral-600 dark:text-neutral-400">
                      {new Date(blog.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex items-center justify-end gap-2">
                        {/* Use dynamic route for edit */}
                        <Link
                          href={`/admin/blogs/edit/${blog.id}`}
                          className="text-neutral-900 dark:text-white hover:underline mr-4 font-medium"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 rounded disabled:opacity-50 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
              >
                Previous
              </button>
              <span className="text-neutral-600 dark:text-neutral-400">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 rounded disabled:opacity-50 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
