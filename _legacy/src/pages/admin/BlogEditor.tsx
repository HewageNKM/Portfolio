import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { auth } from "../../FirebaseClient";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../AppSettings";
import { useAiGenerate } from "../../hooks/useAiGenerate";
import AiAssistButton from "../../components/admin/AiAssistButton";
import AiGenerationModal from "../../components/admin/AiGenerationModal";

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { generateText, isLoading: isAiLoading } = useAiGenerate();
  const [showAiModal, setShowAiModal] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/blogs/${id}`);
          const blog = response.data;
          setTitle(blog.title);
          setSummary(blog.summary);
          setContent(blog.content || "");
          setTags(blog.tags ? blog.tags.join(", ") : "");
          setDate(blog.date.split("T")[0]);
          setIsFeatured(blog.isFeatured || false);
        } catch (error) {
          console.error("Error fetching blog:", error);
          toast.error("Failed to load blog");
        }
      };
      fetchBlog();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const headers = { Authorization: `Bearer ${token}` };
      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
      const blogData = {
        title,
        summary,
        content,
        tags: tagsArray,
        date: new Date(date).toISOString(),
        isFeatured,
      };

      if (id) {
        await axios.put(`${API_BASE_URL}/blogs/${id}`, blogData, { headers });
        toast.success("Blog updated");
      } else {
        await axios.post(`${API_BASE_URL}/blogs`, blogData, { headers });
        toast.success("Blog created");
      }
      navigate("/admin/blogs");
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error("Failed to save blog");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAiContentGenerated = (text: string) => {
    setContent((prev) => prev + `\n<p>${text}</p>`);
    toast.success("Content generated successfully");
  };

  const handleAutoGenerateTags = async () => {
    if (!content && !title && !summary) {
      toast.error("Please add some content, title or summary first");
      return;
    }

    const prompt = `Generate 5-10 SEO optimized tags for a blog post with the following details. Return ONLY the tags separated by commas, no other text.
      
      Title: ${title}
      Summary: ${summary}
      Content: ${content.replace(/<[^>]*>/g, "").substring(0, 1000)}...`; // Strip HTML and limit length

    const generatedTags = await generateText(prompt);

    if (generatedTags) {
      setTags(generatedTags);
      toast.success("Tags generated successfully");
    }
  };

  return (
    <div className="p-8 min-h-screen text-neutral-900 dark:text-neutral-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {id ? "Edit Blog" : "Create Blog"}
        </h1>
        <AiAssistButton onClick={() => setShowAiModal(true)} />
      </div>

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
            Summary
          </label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded-lg dark:bg-neutral-700 dark:text-white focus:ring-neutral-500 focus:border-neutral-500 transition-colors"
            rows={3}
            required
          />
        </div>
        <div>
          <label className="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium">
            Tags
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded-lg dark:bg-neutral-700 dark:text-white focus:ring-neutral-500 focus:border-neutral-500 transition-colors"
              placeholder="Comma separated tags (e.g., tech, coding, web)"
            />
            <button
              type="button"
              onClick={handleAutoGenerateTags}
              disabled={isAiLoading || !content}
              className="bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900 px-4 py-2 rounded-lg hover:bg-neutral-700 dark:hover:bg-neutral-300 disabled:opacity-50 whitespace-nowrap transition-colors"
            >
              {isAiLoading ? "Generating..." : "Auto Generate"}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded-lg dark:bg-neutral-700 dark:text-white focus:ring-neutral-500 focus:border-neutral-500 transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium">
            Content
          </label>
          <div className="bg-white dark:text-black rounded-lg overflow-hidden">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              className="h-64 mb-12"
            />
          </div>
        </div>
        <div className="flex justify-end pt-8">
          <button
            type="button"
            onClick={() => navigate("/admin/blogs")}
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

      {/* AI Modal */}
      <AiGenerationModal
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
        onGenerate={handleAiContentGenerated}
      />
    </div>
  );
};

export default BlogEditor;
