"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";
import { Pencil, PlusIcon, Trash2 } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  items: string[];
}

export default function ServicesListClient() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const response = await apiClient.get(`/services`);
      setServices(response.data);
    } catch (error) {
      // Handled by interceptor
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;
    try {
      const token = await auth.currentUser?.getIdToken();
      await apiClient.delete(`/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Service deleted");
      fetchServices();
    } catch (error) {
      // Handled by interceptor
    }
  };

  return (
    <div className="p-4 sm:p-8 min-h-screen text-neutral-900 dark:text-neutral-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Manage Services</h1>
        <Link
          href="/admin/services/new"
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
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2"></div>
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
              {services.map((service) => (
                <tr
                  key={service.id}
                  className="hover:bg-neutral-50/50 dark:hover:bg-neutral-700/50 transition-colors"
                >
                  <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap font-medium">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: service.color }}
                      />
                      {service.title}
                    </div>
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 max-w-sm truncate text-neutral-600 dark:text-neutral-400">
                    {service.description}
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/services/edit/${service.id}`}
                        className="text-neutral-900 dark:text-white hover:underline mr-4 font-medium"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(service.id)}
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
