import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type TranslationResponse, type TranslationHistoryList } from "@shared/routes";
import { z } from "zod";

export function useHistory() {
  return useQuery({
    queryKey: [api.history.list.path],
    queryFn: async () => {
      const res = await fetch(api.history.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch translation history");
      return api.history.list.responses[200].parse(await res.json());
    },
  });
}

export function useTranslate() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: z.infer<typeof api.translate.submit.input>) => {
      const validated = api.translate.submit.input.parse(data);
      const res = await fetch(api.translate.submit.path, {
        method: api.translate.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.translate.submit.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Translation failed");
      }
      
      return api.translate.submit.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.history.list.path] });
    },
  });
}
