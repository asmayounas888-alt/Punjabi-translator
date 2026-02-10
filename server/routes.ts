import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

// --- Transliteration Logic (Ported) ---

const punjabiToEnglishMap: Record<string, string> = {
  'ੳ': 'u', 'ਅ': 'a', 'ੲ': 'i',
  'ਸ': 's', 'ਹ': 'h', 'ਕ': 'k', 'ਖ': 'kh', 'ਗ': 'g', 'ਘ': 'gh', 'ਙ': 'ng',
  'ਚ': 'ch', 'ਛ': 'chh', 'ਜ': 'j', 'ਝ': 'jh', 'ਞ': 'ny',
  'ਟ': 't', 'ਠ': 'th', 'ਡ': 'd', 'ਢ': 'dh', 'ਣ': 'n',
  'ਤ': 't', 'ਥ': 'th', 'ਦ': 'd', 'ਧ': 'dh', 'ਨ': 'n',
  'ਪ': 'p', 'ਫ': 'ph', 'ਬ': 'b', 'ਭ': 'bh', 'ਮ': 'm',
  'ਯ': 'y', 'ਰ': 'r', 'ਲ': 'l', 'ਵ': 'v', 'ੜ': 'r',
  'ਸ਼': 'sh', 'ਖ਼': 'kh', 'ਗ਼': 'gh', 'ਜ਼': 'z', 'ਫ਼': 'f', 'ਲ਼': 'l',
  'ਾ': 'a', 'ਿ': 'i', 'ੀ': 'ee', 'ੁ': 'u', 'ੂ': 'oo',
  'ੇ': 'e', 'ੈ': 'ai', 'ੋ': 'o', 'ੌ': 'au',
  'ੰ': 'n', 'ੱ': '', 
  '।': '.', '॥': '.',
  '੦': '0', '੧': '1', '੨': '2', '੩': '3', '੪': '4',
  '੫': '5', '੬': '6', '੭': '7', '੮': '8', '੯': '9',
  ' ': ' ', '\n': '\n'
};

const punjabiToUrduMap: Record<string, string> = {
  'ੳ': 'او', 'ਅ': 'ا', 'ੲ': 'ای',
  'ਸ': 'س', 'ਹ': 'ہ', 'ਕ': 'ک', 'ਖ': 'کھ', 'ਗ': 'گ', 'ਘ': 'گھ', 'ਙ': 'ں',
  'ਚ': 'چ', 'چھ': 'چھ', 'ਜ': 'ج', 'ਝ': 'جھ', 'ਞ': 'ن',
  'ਟ': 'ٹ', 'ਠ': 'ٹھ', 'ਡ': 'ڈ', 'ਢ': 'ڈھ', 'ਣ': 'ن',
  'ਤ': 'ت', 'ਥ': 'تھ', 'ਦ': 'د', 'ਧ': 'دھ', 'ਨ': 'ن',
  'ਪ': 'پ', 'ਫ': 'پھ', 'ਬ': 'ب', 'ਭ': 'بھ', 'ਮ': 'م',
  'ਯ': 'ی', 'ਰ': 'ر', 'ਲ': 'ل', 'ਵ': 'و', 'ੜ': 'ڑ',
  'ਸ਼': 'ش', 'ਖ਼': 'خ', 'ਗ਼': 'غ', 'ਜ਼': 'ز', 'ਫ਼': 'ف', 'ਲ਼': 'ل',
  'ਾ': 'ا', 'ਿ': '', 'ੀ': 'ی', 'ੁ': '', 'ੂ': 'و',
  'ੇ': 'ے', 'ੈ': 'ای', 'ੋ': 'و', 'ੌ': 'او',
  'ੰ': 'ں', 'ੱ': '',
  '।': '۔', '॥': '۔',
  '੦': '۰', '੧': '۱', '੨': '۲', '੩': '۳', '੪': '۴',
  '੫': '۵', '੬': '۶', '੭': '۷', '੮': '۸', '੯': '۹',
  ' ': ' ', '\n': '\n'
};

// Common Punjabi word mappings for more "translation-like" output
const commonWords: Record<string, { english: string; urdu: string }> = {
  'ਮੈਂ': { english: 'I', urdu: 'میں' },
  'ਤੁਸੀਂ': { english: 'You', urdu: 'آپ' },
  'ਹਾਂ': { english: 'Yes', urdu: 'ہاں' },
  'ਨਹੀਂ': { english: 'No', urdu: 'نہیں' },
  'ਹੈ': { english: 'is', urdu: 'ہے' },
  'ਹਨ': { english: 'are', urdu: 'ہیں' },
  'ਸੀ': { english: 'was', urdu: 'تھا' },
  'ਸਨ': { english: 'were', urdu: 'تھے' },
  'ਅਤੇ': { english: 'and', urdu: 'اور' },
  'ਵੀ': { english: 'also', urdu: 'بھی' },
  'ਵਿੱਚ': { english: 'in', urdu: 'میں' },
  'ਤੇ': { english: 'on', urdu: 'پر' },
  'ਨੂੰ': { english: 'to', urdu: 'کو' },
  'ਕਰ': { english: 'do', urdu: 'کر' },
  'ਰਿਹਾ': { english: 'doing', urdu: 'رہا' },
  'ਗਿਆ': { english: 'went', urdu: 'گیا' },
  'ਆਇਆ': { english: 'came', urdu: 'آیا' },
  'ਕੀ': { english: 'what', urdu: 'کیا' },
  'ਕਿਉਂ': { english: 'why', urdu: 'کیوں' },
  'ਕਿਵੇਂ': { english: 'how', urdu: 'کیسے' },
  'ਜਦੋਂ': { english: 'when', urdu: 'جب' },
  'ਜਿੱਥੇ': { english: 'where', urdu: 'جہاں' },
  'ਘਰ': { english: 'home', urdu: 'گھر' },
  'ਪਾਣੀ': { english: 'water', urdu: 'پانی' },
  'ਰੋਟੀ': { english: 'bread', urdu: 'روٹی' },
  'ਨਾਮ': { english: 'name', urdu: 'نام' },
  'ਧੰਨਵਾਦ': { english: 'thank you', urdu: 'شکریہ' },
  'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ': { english: 'hello', urdu: 'سلام' },
};

function detectPunjabiScript(text: string): boolean {
  const gurmukhiRange = /[\u0A00-\u0A7F]/;
  return gurmukhiRange.test(text);
}

function detectShahmukhiScript(text: string): boolean {
  const urduRange = /[\u0600-\u06FF]/;
  return urduRange.test(text);
}

function detectLanguage(text: string): string {
  if (detectPunjabiScript(text)) {
    return 'punjabi-gurmukhi';
  }
  if (detectShahmukhiScript(text)) {
    return 'punjabi-shahmukhi';
  }
  if (/[a-zA-Z]/.test(text)) {
    return 'english';
  }
  return 'unknown';
}

function transliterateToEnglish(text: string): string {
  let result = '';
  const chars = [...text];

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const nextChar = chars[i + 1];

    if (nextChar && punjabiToEnglishMap[char + nextChar]) {
      result += punjabiToEnglishMap[char + nextChar];
      i++;
    } else if (punjabiToEnglishMap[char]) {
      result += punjabiToEnglishMap[char];
    } else {
      result += char;
    }
  }
  return result;
}

function transliterateToUrdu(text: string): string {
  let result = '';
  const chars = [...text];

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const nextChar = chars[i + 1];

    if (nextChar && punjabiToUrduMap[char + nextChar]) {
      result += punjabiToUrduMap[char + nextChar];
      i++;
    } else if (punjabiToUrduMap[char]) {
      result += punjabiToUrduMap[char];
    } else {
      result += char;
    }
  }
  return result;
}

function translate(text: string, targetLanguage: string): { translation: string; detectedLanguage: string } {
  const detectedLanguage = detectLanguage(text);
  let translation = '';

  if (detectedLanguage === 'punjabi-gurmukhi') {
    const words = text.split(/(\s+)/);
    const translatedWords = words.map(word => {
      const trimmed = word.trim();
      if (commonWords[trimmed]) {
        return targetLanguage === 'english' ? commonWords[trimmed].english : commonWords[trimmed].urdu;
      }
      return targetLanguage === 'english' ? transliterateToEnglish(word) : transliterateToUrdu(word);
    });
    translation = translatedWords.join('');
  } else if (detectedLanguage === 'punjabi-shahmukhi' || detectedLanguage === 'english') {
    translation = `[Note: This tool specializes in translating Gurmukhi Punjabi to English/Urdu. Direct translation from ${detectedLanguage} is coming soon.]\n\nOriginal: ${text}`;
  } else {
    translation = text;
  }

  return { translation, detectedLanguage };
}

// --- Routes ---

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.translate.submit.path, async (req, res) => {
    try {
      const input = api.translate.submit.input.parse(req.body);
      const { translation, detectedLanguage } = translate(input.text, input.targetLanguage);

      // Store in history
      await storage.createTranslation({
        sourceText: input.text,
        translatedText: translation,
        sourceLang: detectedLanguage,
        targetLang: input.targetLanguage
      });

      res.status(200).json({
        translation,
        detectedLanguage,
        originalText: input.text
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.history.list.path, async (req, res) => {
    try {
      const history = await storage.getHistory();
      res.json(history);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch history" });
    }
  });

  return httpServer;
}
