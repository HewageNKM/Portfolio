import React from "react";
import { Sparkles } from "lucide-react";

interface AiAssistButtonProps {
  onClick: () => void;
  label?: string;
  className?: string; // Allow custom styling extensions
  disabled?: boolean;
}

const AiAssistButton: React.FC<AiAssistButtonProps> = ({
  onClick,
  label = "AI Assist",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900 px-3 py-1.5 text-sm rounded-lg hover:bg-neutral-700 dark:hover:bg-neutral-300 flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <Sparkles size={16} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};

export default AiAssistButton;
