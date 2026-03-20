"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { apiClient } from "@/lib/api-client";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";
import AiAssistButton from "@/components/admin/AiAssistButton";
import { useAiGenerate } from "@/hooks/useAiGenerate";
import axios from "axios";

export default function ProjectEditorClient({ id }: { id?: string }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // AI State
  const { generateText, isLoading: isAiLoading } = useAiGenerate();
  const [aiLoadingField, setAiLoadingField] = useState<
    "description" | "technologies" | null
  >(null);

  const handleAiClick = async (field: "description" | "technologies") => {
    let prompt = "";
    if (field === "description") {
      prompt = `Write a short, professional, and compelling project description for a project titled "${title}". Focus on the technical challenges solved and the core value. Direct response only, no preamble.`;
    } else if (field === "technologies") {
      prompt = `Suggest a comma-separated list of modern technologies (languages, frameworks, tools) for a project titled "${title}" with description: "${description}". Return ONLY the comma-separated list.`;
    }

    if (!prompt) return;

    setAiLoadingField(field);
    try {
      const text = await generateText(prompt, githubUrl);
      if (text) {
        if (field === "description") {
          setDescription(text.trim());
          toast.success("Description generated");
        } else if (field === "technologies") {
          const cleanText = text.replace(/Technologies:/i, "").trim();
          setTechnologies(cleanText);
          toast.success("Technologies suggested");
        }
      }
    } catch (error) {
      toast.error("Failed to generate content");
    } finally {
      setAiLoadingField(null);
    }
  };

  useEffect(() => {
    if (id && id !== "new") {
      const fetchProject = async () => {
        try {
          const response = await apiClient.get(`/projects`);
          const project = response.data.find((p: any) => p.id === id);
          if (project) {
            setTitle(project.title);
            setDescription(project.description);
            setGithubUrl(project.githubUrl);
            setLiveUrl(project.liveUrl || "");
            setTechnologies(
              project.technologies ? project.technologies.join(", ") : ""
            );
            setIsFeatured(project.isFeatured || false);
          }
        } catch (error) {
          // Handled by interceptor
        }
      };
      fetchProject();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const headers = { Authorization: `Bearer ${token}` };
      const projectData = {
        title,
        description,
        githubUrl,
        liveUrl,
        technologies: technologies
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
        isFeatured,
      };

      if (id && id !== "new") {
        await apiClient.put(`/projects/${id}`, projectData, {
          headers,
        });
        toast.success("Project updated");
      } else {
        await apiClient.post(`/projects`, projectData, {
          headers,
        });
        toast.success("Project created");
      }
      router.push("/admin/projects");
    } catch (error) {
      // Handled by interceptor
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 min-h-screen text-neutral-900 dark:text-neutral-100">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <button
          onClick={() => router.push("/admin/projects")}
          className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition shadow-sm border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400">
          {id && id !== "new" ? "Edit Project" : "Add Project"}
        </h1>
      </motion.div>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md p-6 sm:p-10 rounded-2xl shadow-xl border border-neutral-200/50 dark:border-neutral-800/50 space-y-8 relative overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 blur-3xl rounded-full" />

        <div>
          <label className="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium">
            Title
          </label>
          <input
            placeholder="e.g. Project Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded-lg dark:bg-neutral-700 dark:text-white focus:ring-neutral-500 focus:border-neutral-500 transition-colors"
            required
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-neutral-700 dark:text-neutral-300 font-medium">
              Description
            </label>
            <AiAssistButton
              onClick={() => handleAiClick("description")}
              label="Generate Description"
              disabled={!title}
              isLoading={aiLoadingField === "description"}
            />
          </div>
          <textarea
            placeholder="e.g. This is a project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded-lg dark:bg-neutral-700 dark:text-white focus:ring-neutral-500 focus:border-neutral-500 transition-colors"
            rows={4}
            required
          />
        </div>
        <div>
          <label className="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium">
            GitHub URL
          </label>
          <input
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded-lg dark:bg-neutral-700 dark:text-white focus:ring-neutral-500 focus:border-neutral-500 transition-colors"
            required
            placeholder="e.g. https://github.com/username/repository"
          />
        </div>
        <div>
          <label className="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium">
            Live URL (Optional)
          </label>
          <input
            placeholder="e.g. https://example.com"
            type="url"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            className="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded-lg dark:bg-neutral-700 dark:text-white focus:ring-neutral-500 focus:border-neutral-500 transition-colors"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-neutral-700 dark:text-neutral-300 font-medium">
              Technologies (comma separated)
            </label>
            <AiAssistButton
              onClick={() => handleAiClick("technologies")}
              label="Suggest Tech"
              disabled={!title}
              isLoading={aiLoadingField === "technologies"}
            />
          </div>
          <input
            type="text"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            className="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded-lg dark:bg-neutral-700 dark:text-white focus:ring-neutral-500 focus:border-neutral-500 transition-colors"
            placeholder="React, Firebase, Tailwind CSS"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isFeatured"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="w-5 h-5 text-neutral-900 rounded focus:ring-neutral-500"
          />
          <label
            htmlFor="isFeatured"
            className="text-neutral-700 dark:text-neutral-300 font-medium select-none cursor-pointer"
          >
            Featured
          </label>
        </div>
        <div className="flex justify-end pt-8">
          <button
            type="button"
            onClick={() => router.push("/admin/projects")}
            className="mr-4 px-4 py-2 text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-2 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 font-medium transition-colors"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
