import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { auth } from "../../FirebaseClient";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../AppSettings";
import { Save, ArrowLeft } from "lucide-react";
import AiAssistButton from "../../components/admin/AiAssistButton";
import AiGenerationModal from "../../components/admin/AiGenerationModal";

const AchievementEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    link: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // AI State
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  const handleAiClick = () => {
    setAiPrompt(
      `Write a brief and professional description for the achievement "${formData.title}" received in "${formData.date}". Mention the significance and key skills demonstrated.`
    );
    setShowAiModal(true);
  };

  const handleAiGenerated = (text: string) => {
    setFormData((prev) => ({
      ...prev,
      description: prev.description ? prev.description + "\n\n" + text : text,
    }));
    toast.success("Description generated");
  };

  useEffect(() => {
    if (id) {
      const fetchAchievement = async () => {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/achievements/${id}`
          );
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching achievement:", error);
          toast.error("Failed to load achievement");
        }
      };
      fetchAchievement();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const headers = { Authorization: `Bearer ${token}` };

      if (id) {
        await axios.put(`${API_BASE_URL}/achievements/${id}`, formData, {
          headers,
        });
        toast.success("Achievement updated");
      } else {
        await axios.post(`${API_BASE_URL}/achievements`, formData, { headers });
        toast.success("Achievement added");
      }
      navigate("/admin/achievements");
    } catch (error) {
      console.error("Error saving achievement:", error);
      toast.error("Failed to save achievement");
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
          onClick={() => navigate("/admin/achievements")}
          className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold">
          {id ? "Edit Achievement" : "Add Achievement"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent dark:bg-neutral-700 dark:text-white transition-colors"
            required
            placeholder="e.g. Hackathon Winner 2024"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Date
          </label>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent dark:bg-neutral-700 dark:text-white transition-colors"
            required
            placeholder="e.g. October 2024"
          />
        </div>

        <div>
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
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            External Link (Optional)
          </label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent dark:bg-neutral-700 dark:text-white transition-colors"
            placeholder="https://..."
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-8 py-3 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 flex items-center gap-2 font-medium transition-colors"
          >
            <Save size={20} />
            {isLoading ? "Saving..." : "Save Achievement"}
          </button>
        </div>
      </form>

      <AiGenerationModal
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
        onGenerate={handleAiGenerated}
        initialPrompt={aiPrompt}
        title="Generate Achievement Description"
      />
    </div>
  );
};

export default AchievementEditor;
