import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type TranslationResponse } from "@shared/routes";
import { type Translation } from "@shared/schema";
import { translateLocal } from "@/lib/translator";

const STORAGE_KEY = "translation_history";

function getLocalHistory(): Translation[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveToLocalHistory(item: Translation) {
  const history = getLocalHistory();
  const updated = [item, ...history].slice(0, 50);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function useHistory() {
  return useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      return getLocalHistory();
    },
  });
}

export function useTranslate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { text: string; targetLanguage: "english" | "urdu" }) => {
      const { translation, detectedLanguage } = translateLocal(data.text, data.targetLanguage);

      const result: TranslationResponse = {
        translation,
        detectedLanguage,
        originalText: data.text,
      };

      const historyItem: Translation = {
        id: Date.now(),
        sourceText: data.text,
        translatedText: translation,
        sourceLang: detectedLanguage,
        targetLang: data.targetLanguage,
        createdAt: new Date().toISOString() as any,
      };

      saveToLocalHistory(historyItem);

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });
}
