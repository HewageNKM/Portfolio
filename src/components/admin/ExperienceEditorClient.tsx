"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";
import { Save, ArrowLeft } from "lucide-react";
import AiAssistButton from "@/components/admin/AiAssistButton";
import AiGenerationModal from "@/components/admin/AiGenerationModal";

export default function ExperienceEditorClient({ id }: { id?: string }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    duration: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // AI State
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  const handleAiClick = () => {
    setAiPrompt(
      `Write a professional job description with bullet points for a "${formData.role}" position at "${formData.company}". Focus on key achievements and responsibilities. Return ONLY a list of bullet points starting with "- ".`
    );
    setShowAiModal(true);
  };

  const handleAiGenerated = (text: string) => {
    const formattedText = text;
    setFormData((prev) => ({
      ...prev,
      description: prev.description
        ? prev.description + "\n" + formattedText
        : formattedText,
    }));
    toast.success("Description generated");
  };

  useEffect(() => {
    if (id && id !== "new") {
      const fetchExperience = async () => {
        try {
          const response = await apiClient.get(`/experiences/${id}`);
          const data = response.data;
          // Join array back to string for editing
          if (Array.isArray(data.description)) {
            data.description = data.description.join("\n");
          }
          setFormData(data);
        } catch (error) {
          // Handled by interceptor
        }
      };
      fetchExperience();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const headers = { Authorization: `Bearer ${token}` };

      // Convert description string to array
      const payload = {
        ...formData,
        description: formData.description
          .split("\n")
          .filter((line) => line.trim() !== ""),
      };

      if (id && id !== "new") {
        await apiClient.put(`/experiences/${id}`, payload, {
          headers,
        });
        toast.success("Experience updated");
      } else {
        await apiClient.post(`/experiences`, payload, {
          headers,
        });
        toast.success("Experience added");
      }
      router.push("/admin/experiences");
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

  return (
    <div className="text-neutral-900 dark:text-neutral-100 max-w-5xl mx-auto p-4 sm:p-8">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.push("/admin/experiences")}
          className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold">
          {id && id !== "new" ? "Edit Experience" : "Add Experience"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm p-4 sm:p-8 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Role / Job Title
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent dark:bg-neutral-700 dark:text-white transition-colors"
              required
              placeholder="e.g. Senior Software Engineer"
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent dark:bg-neutral-700 dark:text-white transition-colors"
              required
              placeholder="e.g. Google"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent dark:bg-neutral-700 dark:text-white transition-colors"
              required
              placeholder="e.g. Jan 2020 - Present"
            />
          </div>

          <div className="col-span-2">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Description (Bullet Points)
              </label>
              <AiAssistButton
                onClick={handleAiClick}
                label="Generate Bullets"
                disabled={!formData.role || !formData.company}
              />
            </div>
            <p className="text-xs text-neutral-500 mb-2">
              Enter each bullet point on a new line.
            </p>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent dark:bg-neutral-700 dark:text-white transition-colors"
              rows={6}
              placeholder="- Led a team of 5 developers...&#10;- Architected a scalable microservices system..."
              required
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-8 py-3 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 flex items-center gap-2 font-medium transition-colors"
          >
            <Save size={20} />
            {isLoading ? "Saving..." : "Save Experience"}
          </button>
        </div>
      </form>

      <AiGenerationModal
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
        onGenerate={handleAiGenerated}
        initialPrompt={aiPrompt}
        title="Generate Experience Description"
      />
    </div>
  );
}
