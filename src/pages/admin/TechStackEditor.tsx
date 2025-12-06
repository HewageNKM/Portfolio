import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { auth } from "../../FirebaseClient";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../AppSettings";
import { Save, ArrowLeft } from "lucide-react";

const TechStackEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "Frontend",
    icon: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchTechStack = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/tech-stacks/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching tech stack:", error);
          toast.error("Failed to load tech stack");
        }
      };
      fetchTechStack();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const headers = { Authorization: `Bearer ${token}` };

      if (id) {
        await axios.put(`${API_BASE_URL}/tech-stacks/${id}`, formData, {
          headers,
        });
        toast.success("Tech stack updated");
      } else {
        await axios.post(`${API_BASE_URL}/tech-stacks`, formData, { headers });
        toast.success("Tech stack added");
      }
      navigate("/admin/tech-stacks");
    } catch (error) {
      console.error("Error saving tech stack:", error);
      toast.error("Failed to save tech stack");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="text-neutral-900 dark:text-neutral-100 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/admin/tech-stacks")}
          className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold">
          {id ? "Edit Tech Stack" : "Add Tech Stack"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent dark:bg-neutral-700 dark:text-white transition-colors"
            required
            placeholder="e.g. React"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent dark:bg-neutral-700 dark:text-white transition-colors"
          >
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
            <option value="DevOps">DevOps</option>
            <option value="Tools">Tools</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Icon URL
          </label>
          <input
            type="url"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent dark:bg-neutral-700 dark:text-white transition-colors"
            placeholder="https://..."
          />
          <p className="text-xs text-neutral-500 mt-1">
            Provide a URL for the icon image.
          </p>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-8 py-3 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 flex items-center gap-2 font-medium transition-colors"
          >
            <Save size={20} />
            {isLoading ? "Saving..." : "Save Tech Stack"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TechStackEditor;
