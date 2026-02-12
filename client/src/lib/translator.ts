// Advanced Universal Punjabi Transliteration Engine v3.0
// Focused on meaningful English/Urdu transformation for audience input

const shahmukhiToEnglishMap: Record<string, string> = {
    'ا': 'a', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't', 'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd', 'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh', 'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g', 'ل': 'l', 'م': 'm', 'ن': 'n', 'ں': 'n', 'و': 'o', 'ہ': 'h', 'ھ': 'h', 'ی': 'i', 'ے': 'e', 'آ': 'aa', 'ؤ': 'o', 'ئ': 'e'
};

const urduMeanings: Record<string, string> = {
    // Connectives & Particles
    'تے': 'پر', 'دے': 'کے', 'دی': 'کی', 'دا': 'کا', 'وچ': 'میں', 'نوں': 'کو', 'توں': 'سے', 'آں': 'ہیں', 'نیں': 'ہیں', 'سی': 'تھا', 'سن': 'تھے', 'ساڈا': 'ہمارا', 'ساڈی': 'ہماری', 'ساڈے': 'ہمارے', 'ایس': 'اس', 'جس': 'جس', 'تے': 'پر', 'پر': 'لیکن/پر',
    // High-Frequency Punjabi Words -> Urdu Meanings
    'سدھار': 'اصلاح/تبدیلی', 'مُکائے': 'ختم کیے', 'سکھاں': 'سکھوں', 'جگایا': 'بیدار کیا', 'زلزلا': 'زلزلہ', 'وجے': 'بجے/گونجے', 'جائی': 'جنی/اولاد', 'ہمسائی': 'پڑوسی', 'وَیری': 'دشمن', 'دس': 'بتاؤ', 'ایہ': 'یہ', 'چنگے': 'اچھے', 'لگدے': 'لگتے', 'وجے': 'گونجے', 'من': 'ماں', 'تیری': 'تمہاری', 'خُشیاں': 'خوشیاں', 'کردے': 'کرتے', 'ہسدے': 'ہنستے', 'بستے': 'بستے'
};

const englishMeanings: Record<string, string> = {
    // Connectives
    'تے': 'on', 'دے': 'of', 'دی': 'of', 'دا': 'of', 'وچ': 'in', 'نوں': 'to', 'توں': 'from', 'آں': 'am/are', 'نیں': 'are', 'ساڈے': 'our', 'ساڈی': 'our',
    // Content Words -> Simple English
    'سدھار': 'reform', 'مُکائے': 'finished', 'سکھاں': 'Sikhs', 'اندر': 'inside', 'جوش': 'passion', 'جگایا': 'awakened', 'زلزلا': 'earthquake', 'آیا': 'came', 'نعرے': 'slogans', 'وجے': 'echoed', 'نہیں': 'not', 'ماں': 'mother', 'جائی': 'born', 'تیری': 'your', 'ہمسائی': 'neighbor', 'وَیری': 'enemies', 'خُشیاں': 'happiness', 'کردے': 'doing', 'دس': 'tell', 'ایہ': 'this', 'چنگے': 'good', 'لگدے': 'look'
};

function detectScript(text: string): 'gurmukhi' | 'shahmukhi' | 'english' {
    if (/[\u0A00-\u0A7F]/.test(text)) return 'gurmukhi';
    if (/[\u0600-\u06FF]/.test(text)) return 'shahmukhi';
    return 'english';
}

function phonetically(text: string): string {
    let res = '';
    for (const char of Array.from(text)) res += shahmukhiToEnglishMap[char] || char;
    return res.replace(/aa/g, 'a').replace(/ii/g, 'ee');
}

export function translateLocal(text: string, targetLanguage: string): { translation: string; detectedLanguage: string } {
    const script = detectScript(text);
    const lines = text.split('\n');

    const translatedLines = lines.map(line => {
        const words = line.split(/(\s+)/);
        return words.map(word => {
            const trimmed = word.trim();
            if (!trimmed) return word;

            if (script === 'shahmukhi') {
                if (targetLanguage === 'urdu') {
                    return urduMeanings[trimmed] || word;
                } else {
                    return englishMeanings[trimmed] || phonetically(trimmed);
                }
            }
            return word;
        }).join('');
    });

    return {
        translation: translatedLines.join('\n').trim(),
        detectedLanguage: `punjabi-${script}`
    };
}
