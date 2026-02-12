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
    mutationFn: async ({ text, targetLanguage }: { text: string; targetLanguage: string }) => {
      // First check if text is empty
      if (!text.trim()) return { translation: "", detectedLanguage: "none" };

      // Perform Neural AI Translation for Google-level Quality
      const result = await translateNeural(text, targetLanguage);

      return {
        translation: result,
        detectedLanguage: "punjabi-ai"
      };
    },
    onSuccess: (data: { translation: string; detectedLanguage: string }, variables: { text: string; targetLanguage: string }) => {
      if (!variables.text.trim()) return;

      const newTranslation: Translation = {
        id: Math.random().toString(36).substring(7),
        text: variables.text,
        translation: data.translation,
        targetLanguage: variables.targetLanguage,
        timestamp: Date.now(),
      };

      const updatedHistory = [newTranslation, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem("punjabi_translations", JSON.stringify(updatedHistory));
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
