import React, { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { useAiGenerate } from "../../hooks/useAiGenerate";

interface AiGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (text: string) => void;
  initialPrompt?: string; // Optional predefined prompt
  title?: string; // Optional custom title
}

const AiGenerationModal: React.FC<AiGenerationModalProps> = ({
  isOpen,
  onClose,
  onGenerate,
  initialPrompt = "",
  title = "AI Writing Assistant",
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const { generateText, isLoading } = useAiGenerate();

  if (!isOpen) return null;

  const handleGenerateClick = async () => {
    const text = await generateText(prompt);
    if (text) {
      onGenerate(text);
      onClose();
      // Only reset if it wasn't a fixed initial prompt scenario (optional UX choice)
      if (!initialPrompt) setPrompt("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-xl w-full max-w-md border border-neutral-200 dark:border-neutral-700 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Sparkles
            className="text-purple-600 dark:text-purple-400"
            size={24}
          />
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
            {title}
          </h3>
        </div>

        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          Describe what you want the AI to write about.
        </p>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg mb-4 dark:bg-neutral-700 dark:text-white h-32 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors resize-none"
          placeholder="e.g., Write an introduction about..."
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerateClick}
            disabled={isLoading || !prompt.trim()}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium transition-colors shadow-lg shadow-purple-600/20"
          >
            <Sparkles size={16} />
            {isLoading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiGenerationModal;
