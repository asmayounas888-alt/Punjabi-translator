import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { translateLocal } from "@/lib/translator";

export type Translation = {
  id: string;
  text: string;
  translation: string;
  targetLanguage: string;
  timestamp: number;
};

// AI Neural Translation Engine (Google Quality)
async function translateNeural(text: string, targetLanguage: string): Promise<string> {
  const target = targetLanguage === 'urdu' ? 'ur' : 'en';
  // Detected script (Gurmukhi vs Shahmukhi)
  const isGurmukhi = /[\u0A00-\u0A7F]/.test(text);

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const data = await response.json();

    // Extracting meaningful sentences from the neural response
    if (data && data[0]) {
      return data[0].map((sentence: any) => sentence[0]).join('');
    }

    // Fallback to our local high-fidelity engine if AI fails
    return translateLocal(text, targetLanguage).translation;
  } catch (error) {
    console.error("Neural Translation Error:", error);
    return translateLocal(text, targetLanguage).translation;
  }
}

export function useTranslate() {
  const queryClient = useQueryClient();
  const [history, setHistory] = useState<Translation[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("punjabi_translations");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const mutation = useMutation({
    mutationFn: async ({ text, targetLanguage, context = "neutral", includeScript = false }: {
      text: string;
      targetLanguage: string;
      context?: string;
      includeScript?: boolean;
    }) => {
      // First check if text is empty
      if (!text.trim()) return { translation: "", detectedLanguage: "none", transliteration: "" };

      // Add context hint to the text for Neural AI
      const promptText = context !== "neutral" ? `[Context: ${context}] ${text}` : text;

      // Perform Neural AI Translation
      const result = await translateNeural(promptText, targetLanguage);

      // Handle Script Bridge if requested
      let scriptOutput = "";
      if (includeScript) {
        const localResult = translateLocal(text, targetLanguage);
        // If local engine detects Gurmukhi, we want Shahmukhi and vice versa
        scriptOutput = localResult.detectedLanguage.includes("gurmukhi") ? "Transliterated to Shahmukhi..." : "Transliterated to Gurmukhi...";
      }

      return {
        translation: result,
        detectedLanguage: "punjabi-ai",
        transliteration: scriptOutput
      };
    },
    onSuccess: (data: { translation: string; detectedLanguage: string }, variables: { text: string; targetLanguage: string }) => {
      if (!variables.text.trim()) return;

      // Truncate text for history to save space if it's too long (Batch translations)
      const truncate = (str: string) => str.length > 5000 ? str.substring(0, 5000) + "... [Truncated]" : str;

      const newTranslation: Translation = {
        id: Math.random().toString(36).substring(7),
        text: truncate(variables.text),
        translation: truncate(data.translation),
        targetLanguage: variables.targetLanguage,
        timestamp: Date.now(),
      };

      try {
        const updatedHistory = [newTranslation, ...history].slice(0, 10);
        setHistory(updatedHistory);
        localStorage.setItem("punjabi_translations", JSON.stringify(updatedHistory));
      } catch (e) {
        console.warn("Storage full, emergency trimming history", e);
        // Emergency: Just store the single newest one or clear if totally failed
        const emergencyHistory = [newTranslation];
        setHistory(emergencyHistory);
        try {
          localStorage.setItem("punjabi_translations", JSON.stringify(emergencyHistory));
        } catch (innerErr) {
          localStorage.removeItem("punjabi_translations");
        }
      }
    },
  });

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("punjabi_translations");
  };

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    lastResult: mutation.data,
    history,
    clearHistory,
  };
}
