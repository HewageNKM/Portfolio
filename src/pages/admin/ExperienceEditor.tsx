import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { auth } from "../../FirebaseClient";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../AppSettings";
import { Save, ArrowLeft } from "lucide-react";

const ExperienceEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    duration: "",
    description: "", // Stored as a string, will be split when used/saved
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchExperience = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/experiences/${id}`);
          const data = response.data;
          // Join array back to string for editing
          if (Array.isArray(data.description)) {
            data.description = data.description.join("\n");
          }
          setFormData(data);
        } catch (error) {
          console.error("Error fetching experience:", error);
          toast.error("Failed to load experience record");
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

      if (id) {
        await axios.put(`${API_BASE_URL}/experiences/${id}`, payload, {
          headers,
        });
        toast.success("Experience updated");
      } else {
        await axios.post(`${API_BASE_URL}/experiences`, payload, { headers });
        toast.success("Experience added");
      }
      navigate("/admin/experiences");
    } catch (error) {
      console.error("Error saving experience:", error);
      toast.error("Failed to save experience record");
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
    <div className="text-neutral-900 dark:text-neutral-100 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/admin/experiences")}
          className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold">
          {id ? "Edit Experience" : "Add Experience"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 space-y-6"
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
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Description (Bullet Points)
            </label>
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
    </div>
  );
};

export default ExperienceEditor;
