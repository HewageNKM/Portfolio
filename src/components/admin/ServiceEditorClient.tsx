"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";
import { Save, ArrowLeft, Plus, X } from "lucide-react";
import AiAssistButton from "@/components/admin/AiAssistButton";
import AiGenerationModal from "@/components/admin/AiGenerationModal";

export default function ServiceEditorClient({ id }: { id?: string }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "SiReact", // Default
    color: "#61DAFB", // Default
    items: [] as string[],
  });
  const [newItem, setNewItem] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // AI State
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  const handleAiClick = () => {
    setAiPrompt(
      `Write a brief and professional description for a service titled "${formData.title}".`
    );
    setShowAiModal(true);
  };

  const handleAiGenerated = (text: string) => {
    setFormData((prev) => ({
      ...prev,
      description: text,
    }));
    toast.success("Description generated");
  };

  useEffect(() => {
    if (id && id !== "new") {
      const fetchService = async () => {
        try {
          const response = await apiClient.get(`/services/${id}`);
          setFormData(response.data);
        } catch (error) {
          // Handled by interceptor
        }
      };
      fetchService();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const headers = { Authorization: `Bearer ${token}` };

      if (id && id !== "new") {
        await apiClient.put(`/services/${id}`, formData, {
          headers,
        });
        toast.success("Service updated");
      } else {
        await apiClient.post(`/services`, formData, {
          headers,
        });
        toast.success("Service added");
      }
      router.push("/admin/services");
    } catch (error) {
      // Handled by interceptor
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    if (newItem.trim()) {
      setFormData({ ...formData, items: [...formData.items, newItem.trim()] });
      setNewItem("");
    }
  };

  const removeItem = (index: number) => {
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    setFormData({ ...formData, items: newItems });
  };

  return (
    <div className="text-neutral-900 dark:text-neutral-100 max-w-4xl mx-auto p-8">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.push("/admin/services")}
          className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold">
          {id && id !== "new" ? "Edit Service" : "Add Service"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Service Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent dark:bg-neutral-700 dark:text-white transition-colors"
              required
              placeholder="e.g. Web Development"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Icon Name (React Icons)
            </label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent dark:bg-neutral-700 dark:text-white transition-colors"
              required
              placeholder="e.g. SiReact"
            />
            <p className="text-xs text-neutral-500 mt-1">
              Use icon names from react-icons/si (Simple Icons)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Color (Hex)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="h-12 w-12 p-1 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 cursor-pointer"
              />
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="flex-1 p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent dark:bg-neutral-700 dark:text-white transition-colors uppercase"
                required
                placeholder="#000000"
              />
            </div>
          </div>

          <div className="col-span-2">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Description
              </label>
              <AiAssistButton
                onClick={handleAiClick}
                label="Generate Description"
                disabled={!formData.title}
              />
            </div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent dark:bg-neutral-700 dark:text-white transition-colors"
              rows={3}
              required
              placeholder="Brief description of the service"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Service Items/Features
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addItem())
                }
                className="flex-1 p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent dark:bg-neutral-700 dark:text-white transition-colors"
                placeholder="Add a feature (e.g. Next.js, SEO)"
              />
              <button
                type="button"
                onClick={addItem}
                className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-2 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="space-y-2">
              {formData.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-neutral-100 dark:bg-neutral-700 rounded-lg"
                >
                  <span className="text-sm text-neutral-800 dark:text-neutral-200">
                    {item}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              {formData.items.length === 0 && (
                <p className="text-sm text-neutral-500 italic text-center py-2">
                  No items added yet
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-8 py-3 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 flex items-center gap-2 font-medium transition-colors"
          >
            <Save size={20} />
            {isLoading ? "Saving..." : "Save Service"}
          </button>
        </div>
      </form>

      <AiGenerationModal
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
        onGenerate={handleAiGenerated}
        initialPrompt={aiPrompt}
        title="Generate Service Description"
      />
    </div>
  );
}
