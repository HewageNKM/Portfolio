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
    icon: "SiReact",
    color: "#61DAFB",
    items: [] as string[],
  });

  const [newItem, setNewItem] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showAiModal, setShowAiModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  const handleAiClick = () => {
    setAiPrompt(
      `Write a brief and professional description for a service titled "${formData.title}".`
    );
    setShowAiModal(true);
  };

  const handleAiGenerated = (text: string) => {
    setFormData((prev) => ({ ...prev, description: text }));
    toast.success("Description generated");
  };

  useEffect(() => {
    if (id && id !== "new") {
      const load = async () => {
        try {
          const res = await apiClient.get(`/services/${id}`);
          setFormData(res.data);
        } catch {}
      };
      load();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const headers = { Authorization: `Bearer ${token}` };

      if (id && id !== "new") {
        await apiClient.put(`/services/${id}`, formData, { headers });
        toast.success("Service updated");
      } else {
        await apiClient.post(`/services`, formData, { headers });
        toast.success("Service added");
      }

      router.push("/admin/services");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const addItem = () => {
    if (!newItem.trim()) return;
    setFormData({ ...formData, items: [...formData.items, newItem.trim()] });
    setNewItem("");
  };

  const removeItem = (i: number) =>
    setFormData({
      ...formData,
      items: formData.items.filter((_, idx) => idx !== i),
    });

  return (
    <div className="text-neutral-900 dark:text-neutral-100 max-w-5xl mx-auto p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.push("/admin/services")}
          className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <ArrowLeft size={24} />
        </button>

        <h1 className="text-2xl font-bold">
          {id && id !== "new" ? "Edit Service" : "Add Service"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/70 dark:bg-neutral-800/60 backdrop-blur-sm p-4 sm:p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium">
              Service Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-neutral-300 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
              placeholder="e.g. Web Development"
              required
            />
          </div>

          {/* Icon */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Icon Name (React Icons)
            </label>
            <input
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-neutral-300 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
              placeholder="e.g. SiReact"
            />
            <p className="text-xs text-neutral-500 mt-1">From react-icons/si</p>
          </div>

          {/* Color */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Color (Hex)
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="h-12 w-14 rounded-md border border-neutral-300 dark:border-neutral-600 dark:bg-neutral-700"
              />

              <input
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="flex-1 min-w-[140px] p-3 rounded-lg border border-neutral-300 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white uppercase focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                placeholder="#000000"
              />
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Description</label>
              <AiAssistButton
                onClick={handleAiClick}
                disabled={!formData.title}
                label="Generate"
              />
            </div>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 rounded-lg border border-neutral-300 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
              placeholder="Brief service description"
            />
          </div>

          {/* Items */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium">
              Service Items / Features
            </label>

            <div className="flex flex-wrap gap-3 mb-3">
              <input
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addItem())
                }
                className="flex-1 min-w-[200px] p-3 rounded-lg border border-neutral-300 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                placeholder="e.g. Next.js, SEO"
              />

              <button
                type="button"
                onClick={addItem}
                className="px-4 py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-lg"
              >
                <Plus size={20} />
              </button>
            </div>

            {/* Items list */}
            <div className="space-y-2">
              {formData.items.length ? (
                formData.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-3 bg-neutral-100 dark:bg-neutral-700 rounded-lg"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => removeItem(i)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-neutral-500 italic text-center">
                  No items added yet
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end pt-3">
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-lg flex items-center gap-2"
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
      />
    </div>
  );
}
