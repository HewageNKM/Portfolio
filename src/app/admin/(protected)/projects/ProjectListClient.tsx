"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";
import { Pencil, PlusIcon, Trash2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
}

export default function ProjectListClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const response = await apiClient.get(`/projects`);
      setProjects(response.data);
    } catch (error) {
      // Handled by interceptor
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    try {
      const token = await auth.currentUser?.getIdToken();
      await apiClient.delete(`/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Project deleted");
      fetchProjects();
    } catch (error) {
      // Handled by interceptor
    }
  };

  return (
    <div className="p-4 sm:p-8 min-h-screen text-neutral-900 dark:text-neutral-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Manage Projects</h1>
        <Link
          href="/admin/projects/new"
          className="flex flex-row gap-1 items-center bg-neutral-900 dark:bg-white dark:text-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
        >
          <PlusIcon size={20} /> New
        </Link>
      </div>
      {isLoading ? (
        <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-neutral-50 dark:bg-neutral-800/50">
              <tr>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-right text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3"></div>
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-2/3"></div>
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-2">
                      <div className="h-8 w-8 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                      <div className="h-8 w-8 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-neutral-50 dark:bg-neutral-800/50">
              <tr>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-right text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-neutral-50/50 dark:hover:bg-neutral-700/50 transition-colors"
                >
                  <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap font-medium">
                    {project.title}
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap truncate max-w-xs text-neutral-600 dark:text-neutral-400">
                    {project.description}
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/projects/edit/${project.id}`}
                        className="text-neutral-900 dark:text-white hover:underline mr-4 font-medium"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
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
      )}
    </div>
  );
}
