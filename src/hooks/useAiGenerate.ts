import { useState } from "react";
import axios from "axios";
import { auth } from "@/lib/firebase";
import { INTERNAL_API_BASE_URL } from "@/lib/constants";
import toast from "react-hot-toast";

interface UseAiGenerateResult {
  generateText: (prompt: string) => Promise<string | null>;
  isLoading: boolean;
  error: string | null;
}

export const useAiGenerate = (): UseAiGenerateResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateText = async (prompt: string): Promise<string | null> => {
    if (!prompt.trim()) {
      toast.error("Prompt cannot be empty");
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        throw new Error("User not authenticated");
      }

      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(
        `${INTERNAL_API_BASE_URL}/ai/generate`,
        { prompt },
        { headers }
      );

      return response.data.text;
    } catch (err) {
      console.error("AI Generation error:", err);
      const errorMessage =
        (err as any)?.response?.data?.error || "Failed to generate content";
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { generateText, isLoading, error };
};
