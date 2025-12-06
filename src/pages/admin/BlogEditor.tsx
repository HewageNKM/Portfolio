import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../config";

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
  const [isTagLoading, setIsTagLoading] = useState(false);

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

  const [showAiModal, setShowAiModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(
        `${API_BASE_URL}/ai/generate`,
        { prompt: aiPrompt },
        { headers }
      );

      const generatedText = response.data.text;
      setContent((prev) => prev + `\n<p>${generatedText}</p>`);
      toast.success("Content generated successfully");
      setShowAiModal(false);
      setAiPrompt("");
    } catch (error) {
      console.error("AI Generation error:", error);
      toast.error("Failed to generate content");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleAutoGenerateTags = async () => {
    if (!content && !title && !summary) {
      toast.error("Please add some content, title or summary first");
      return;
    }
    setIsTagLoading(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const headers = { Authorization: `Bearer ${token}` };
      const prompt = `Generate 5-10 SEO optimized tags for a blog post with the following details. Return ONLY the tags separated by commas, no other text.
      
      Title: ${title}
      Summary: ${summary}
      Content: ${content.replace(/<[^>]*>/g, "").substring(0, 1000)}...`; // Strip HTML and limit length

      const response = await axios.post(
        `${API_BASE_URL}/ai/generate`,
        { prompt },
        { headers }
      );

      const generatedTags = response.data.text.trim();
      setTags(generatedTags);
      toast.success("Tags generated successfully");
    } catch (error) {
      console.error("Tag Generation error:", error);
      toast.error("Failed to generate tags");
    } finally {
      setIsTagLoading(false);
    }
  };

  return (
    <div className="p-8 min-h-screen text-neutral-900 dark:text-neutral-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {id ? "Edit Blog" : "Create Blog"}
        </h1>
        <button
          type="button"
          onClick={() => setShowAiModal(true)}
          className="bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900 px-4 py-2 rounded-lg hover:bg-neutral-700 dark:hover:bg-neutral-300 flex items-center gap-2 transition-colors"
        >
          <span>✨ AI Assist</span>
        </button>
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
              disabled={isTagLoading || !content}
              className="bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900 px-4 py-2 rounded-lg hover:bg-neutral-700 dark:hover:bg-neutral-300 disabled:opacity-50 whitespace-nowrap transition-colors"
            >
              {isTagLoading ? "Generating..." : "Auto Generate"}
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
      {showAiModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-xl w-full max-w-md border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">
              AI Writing Assistant
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              Describe what you want the AI to write about.
            </p>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg mb-4 dark:bg-neutral-700 dark:text-white h-32 focus:ring-neutral-500 focus:border-neutral-500 transition-colors"
              placeholder="e.g., Write an introduction about the importance of web accessibility..."
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAiModal(false)}
                className="px-4 py-2 text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAiGenerate}
                disabled={isAiLoading || !aiPrompt.trim()}
                className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-2 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 flex items-center gap-2 font-medium transition-colors"
              >
                {isAiLoading ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogEditor;
