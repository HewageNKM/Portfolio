import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../config";

const ProjectEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [technologies, setTechnologies] = useState("");
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
            setTechnologies(project.technologies ? project.technologies.join(", ") : "");
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
        technologies: technologies.split(",").map((t) => t.trim()).filter((t) => t),
      };

      if (id) {
        await axios.put(`${API_BASE_URL}/projects/${id}`, projectData, { headers });
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
    <div className="p-8 min-h-screen dark:text-white">
      <h1 className="text-3xl font-bold mb-8">{id ? "Edit Project" : "Add Project"}</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            rows={4}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">GitHub URL</label>
          <input
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Live URL (Optional)</label>
          <input
            type="url"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Technologies (comma separated)</label>
          <input
            type="text"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="React, Firebase, Tailwind CSS"
          />
        </div>
        <div className="flex justify-end pt-8">
          <button
            type="button"
            onClick={() => navigate("/admin/projects")}
            className="mr-4 px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectEditor;
