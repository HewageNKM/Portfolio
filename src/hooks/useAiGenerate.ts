import { useState } from "react";
import { apiClient } from "@/lib/api-client";
import { auth } from "@/lib/firebase";
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
      const response = await apiClient.post(
        `/ai/generate`,
        { prompt },
        { headers }
      );

      return response.data.text;
    } catch (err) {
      console.error("AI Generation error:", err);
      // Detailed error is handled by interceptor, but we still catch to return null
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { generateText, isLoading, error };
};
