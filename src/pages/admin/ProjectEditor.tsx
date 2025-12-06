import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { auth } from "../../FirebaseClient";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../AppSettings";

const ProjectEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/projects`);
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
          console.error("Error fetching project:", error);
          toast.error("Failed to load project");
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

      if (id) {
        await axios.put(`${API_BASE_URL}/projects/${id}`, projectData, {
          headers,
        });
        toast.success("Project updated");
      } else {
        await axios.post(`${API_BASE_URL}/projects`, projectData, { headers });
        toast.success("Project created");
      }
      navigate("/admin/projects");
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Failed to save project");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 min-h-screen text-neutral-900 dark:text-neutral-100">
      <h1 className="text-3xl font-bold mb-8">
        {id ? "Edit Project" : "Add Project"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 space-y-6"
      >
        <div>
          <label className="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded-lg dark:bg-neutral-700 dark:text-white focus:ring-neutral-500 focus:border-neutral-500 transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium">
            Description
          </label>
          <textarea
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
          />
        </div>
        <div>
          <label className="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium">
            Live URL (Optional)
          </label>
          <input
            type="url"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            className="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded-lg dark:bg-neutral-700 dark:text-white focus:ring-neutral-500 focus:border-neutral-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium">
            Technologies (comma separated)
          </label>
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
            Feature this project on Landing Page
          </label>
        </div>
        <div className="flex justify-end pt-8">
          <button
            type="button"
            onClick={() => navigate("/admin/projects")}
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
      </form>
    </div>
  );
};

export default ProjectEditor;
