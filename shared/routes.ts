import { z } from 'zod';
import { insertTranslationSchema, translations } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  translate: {
    submit: {
      method: 'POST' as const,
      path: '/api/translate',
      input: z.object({
        text: z.string().min(1, "Text is required"),
        targetLanguage: z.enum(["english", "urdu"]),
      }),
      responses: {
        200: z.object({
          translation: z.string(),
          detectedLanguage: z.string(),
          originalText: z.string(),
        }),
        400: errorSchemas.validation,
      },
    },
  },
  history: {
    list: {
      method: 'GET' as const,
      path: '/api/history',
      responses: {
        200: z.array(z.custom<typeof translations.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type TranslationResponse = z.infer<typeof api.translate.submit.responses[200]>;
export type TranslationHistoryList = z.infer<typeof api.history.list.responses[200]>;
