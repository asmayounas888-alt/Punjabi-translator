import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const translations = pgTable("translations", {
  id: serial("id").primaryKey(),
  sourceText: text("source_text").notNull(),
  translatedText: text("translated_text").notNull(),
  sourceLang: text("source_lang").notNull(),
  targetLang: text("target_lang").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTranslationSchema = createInsertSchema(translations).omit({
  id: true,
  createdAt: true
});

export type Translation = typeof translations.$inferSelect;
export type InsertTranslation = z.infer<typeof insertTranslationSchema>;
