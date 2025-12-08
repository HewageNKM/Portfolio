"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";
import { Layers, Pencil, PlusIcon, Trash2 } from "lucide-react";

interface TechStack {
  id: string;
  name: string;
  category: string;
  icon?: string;
}

export default function TechStackListClient() {
  const [techStacks, setTechStacks] = useState<TechStack[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTechStacks = async () => {
    try {
      const response = await apiClient.get(`/tech-stacks`);
      setTechStacks(response.data);
    } catch (error) {
      // Handled by interceptor
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTechStacks();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this tech stack?"))
      return;
    try {
      const token = await auth.currentUser?.getIdToken();
      await apiClient.delete(`/tech-stacks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Tech stack deleted");
      fetchTechStacks();
    } catch (error) {
      // Handled by interceptor
    }
  };

  return (
    <div className="p-8 min-h-screen text-neutral-900 dark:text-neutral-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Tech Stacks</h1>
        <Link
          href="/admin/tech-stacks/new"
          className="flex flex-row gap-1 items-center bg-neutral-900 dark:bg-white dark:text-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
        >
          <PlusIcon size={20} /> New
        </Link>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {techStacks.length === 0 ? (
            <div className="col-span-full bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 text-center text-neutral-500">
              No tech stacks found.
            </div>
          ) : (
            techStacks.map((stack) => (
              <div
                key={stack.id}
                className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 flex flex-col items-center text-center relative group"
              >
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/admin/tech-stacks/edit/${stack.id}`}
                    className="p-1 text-neutral-600 hover:bg-neutral-100 rounded dark:text-neutral-400 dark:hover:bg-neutral-700/50"
                  >
                    <Pencil size={14} />
                  </Link>
                  <button
                    onClick={() => handleDelete(stack.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="w-12 h-12 mb-3 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center overflow-hidden">
                  {stack.icon ? (
                    <img
                      src={stack.icon}
                      alt={stack.name}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <Layers size={20} className="text-neutral-400" />
                  )}
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                  {stack.name}
                </h3>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 px-2 py-0.5 bg-neutral-100 dark:bg-neutral-700 rounded-full">
                  {stack.category}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
