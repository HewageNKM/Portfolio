"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";
import { INTERNAL_API_BASE_URL } from "@/lib/constants";
import { Pencil, PlusIcon, Trash2, Trophy } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  date: string;
  description: string;
}

export default function AchievementListClient() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAchievements = async () => {
    try {
      const response = await axios.get(`${INTERNAL_API_BASE_URL}/achievements`);
      setAchievements(response.data);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      toast.error("Failed to fetch achievements");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this achievement?"))
      return;
    try {
      const token = await auth.currentUser?.getIdToken();
      await axios.delete(`${INTERNAL_API_BASE_URL}/achievements/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Achievement deleted");
      fetchAchievements();
    } catch (error) {
      console.error("Error deleting achievement:", error);
      toast.error("Failed to delete achievement");
    }
  };

  return (
    <div className="p-8 min-h-screen text-neutral-900 dark:text-neutral-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Achievements</h1>
        <Link
          href="/admin/achievements/new"
          className="flex flex-row gap-1 items-center bg-neutral-900 dark:bg-white dark:text-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
        >
          <PlusIcon size={20} /> New
        </Link>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.length === 0 ? (
            <div className="col-span-2 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 text-center text-neutral-500">
              No achievements found.
            </div>
          ) : (
            achievements.map((ach) => (
              <div
                key={ach.id}
                className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-lg">
                      <Trophy size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-neutral-900 dark:text-white">
                        {ach.title}
                      </h3>
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        {ach.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/achievements/edit/${ach.id}`}
                      className="p-2 text-neutral-600 hover:bg-neutral-100 rounded dark:text-neutral-400 dark:hover:bg-neutral-700/50"
                    >
                      <Pencil size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(ach.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm line-clamp-3">
                  {ach.description}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
