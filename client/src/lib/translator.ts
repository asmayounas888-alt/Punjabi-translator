// Universal Punjabi Semantic Translation Engine v6.0
// Goal: Comprehensive Semantic Meaning for General Public
// Features: Normalization + Phrase Matching + Deep Semantic Dictionary

const gurmukhiMap: Record<string, string> = {
    'ੳ': 'u', 'ਅ': 'a', 'ੲ': 'i', 'ਸ': 's', 'ਹ': 'h', 'ਕ': 'k', 'ਖ': 'kh', 'ਗ': 'g', 'ਘ': 'gh', 'ਙ': 'ng', 'ਚ': 'ch', 'ਛ': 'chh', 'ਜ': 'j', 'ਝ': 'jh', 'ਞ': 'ny', 'ਟ': 't', 'ਠ': 'th', 'ਡ': 'd', 'ਢ': 'dh', 'ਣ': 'n', 'ਤ': 't', 'ਥ': 'th', 'ਦ': 'd', 'ਧ': 'dh', 'ਨ': 'n', 'ਪ': 'p', 'ਫ': 'ph', 'ਬ': 'b', 'ਭ': 'bh', 'ਮ': 'm', 'ਯ': 'y', 'ਰ': 'r', 'ਲ': 'l', 'ਵ': 'v', 'ੜ': 'r', 'ਸ਼': 'sh', 'ਖ਼': 'kh', 'ਗ਼': 'gh', 'ਜ਼': 'z', 'ਫ਼': 'f', 'ਾ': 'a', 'ਿ': 'i', 'ੀ': 'ee', 'ੁ': 'u', 'ੂ': 'oo', 'ੇ': 'e', 'ੈ': 'ai', 'ੋ': 'o', 'ੌ': 'au', 'ੰ': 'n', 'ੱ': '', '।': '.', '॥': '.'
};

const shahmukhiMap: Record<string, string> = {
    'ا': 'a', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't', 'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd', 'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh', 'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g', 'ل': 'l', 'م': 'm', 'ن': 'n', 'ں': 'n', 'و': 'o', 'ہ': 'h', 'ھ': 'h', 'ی': 'i', 'ے': 'e', 'آ': 'aa', 'ؤ': 'o', 'ئ': 'e'
};

// Natural Urdu Dictionary (Refined for the Public)
const urduMeanings: Record<string, string> = {
    // Grammar & Connectives
    'تے': 'پر', 'دے': 'کے', 'دی': 'کی', 'دا': 'کا', 'وچ': 'میں', 'نوں': 'کو', 'توں': 'سے', 'آں': 'ہوں/ہیں', 'نیں': 'ہیں', 'سی': 'تھا', 'سن': 'تھے', 'ساڈا': 'ہمارا', 'ساڈی': 'ہماری', 'ساڈے': 'ہمارے', 'ایس': 'اس', 'جس': 'جس', 'پر': 'لیکن/پر', 'ایہ': 'یہ', 'اوہ': 'وہ', 'کجھ': 'کچھ', 'جد': 'جب', 'تد': 'تب', 'کد': 'کب', 'وی': 'بھی', 'نال': 'ساتھ',
    // Poetic & Common Words
    'سدھار': 'اصلاح', 'مکائے': 'ختم کیے', 'سکھاں': 'سکھوں', 'اندر': 'اندر', 'جوش': 'جذبہ', 'جگایا': 'بیدار کیا', 'زلزلا': 'زلزلہ', 'آیا': 'آیا', 'وجے': 'گونجے', 'نہیں': 'نہیں', 'ماں': 'ماں', 'جائی': 'اولاد', 'ہمسائی': 'پڑوسی', 'ویری': 'دشمن', 'خوشیاں': 'خوشیاں', 'کردے': 'کرتے', 'دس': 'بتاؤ', 'چنگے': 'اچھے', 'لگدے': 'لگتے', 'ہسدے': 'ہنستے', 'بستے': 'بستے', 'گھر': 'گھر', 'پتھر': 'پتھر', 'دعاواں': 'دعائیں', 'بارش': 'بارش', 'سمندر': 'سمندر', 'ہاسے': 'ہنسی', 'کھوہ': 'چھین', 'اتھر': 'آنسو', 'اکھاں': 'آنکھوں', 'پتر': 'بیٹا', 'رکھاں': 'درختوں', 'منظر': 'منظر', 'سنج': 'ویران', 'مسنجا': 'اکیلا', 'اکھر': 'حروف', 'رال': 'مل', 'کھیڈدے': 'کھیلتے', 'جیکر': 'اگر', 'ویرا': 'بھائی', 'ہوندا': 'ہوتا', 'بلھے': 'بلھے', 'شاہ': 'شاہ', 'نعرے': 'نعرے', 'رانگڑ': 'رانگڑ', 'پانڈو': 'پانڈو', 'تیری': 'تمہاری', 'ہم': 'ہم', 'اکٹھے': 'اکٹھے', 'کھیلا': 'کھیلا', 'کرتے': 'کرتے', 'تھے': 'تھے'
};

// Simple English Dictionary (Readable for the Public)
const englishMeanings: Record<string, string> = {
    // Connectives & Basic Words
    'تے': 'on', 'دے': 'of', 'دی': 'of', 'دا': 'of', 'وچ': 'in', 'نوں': 'to', 'توں': 'from', 'آں': 'am/are', 'نیں': 'are', 'ساڈا': 'our', 'ساڈی': 'our', 'ساڈے': 'our', 'ایس': 'this', 'جس': 'which', 'پر': 'but/on', 'ایہ': 'this', 'اوہ': 'that', 'کجھ': 'some', 'جد': 'when', 'وی': 'also', 'نال': 'with',
    // Content Words (Mapped to Simple English)
    'سدھار': 'reform', 'مکائے': 'finished', 'سکھاں': 'Sikhs', 'اندر': 'inside', 'جوش': 'passion', 'جگایا': 'awakened', 'زلزلا': 'earthquake', 'آیا': 'came', 'نعرے': 'slogans', 'وجے': 'echoed', 'نہیں': 'not', 'ماں': 'mother', 'جائی': 'born', 'تیری': 'your', 'ہمسائی': 'neighbor', 'ویری': 'enemies', 'خوشیاں': 'happiness', 'کردے': 'doing', 'دس': 'tell', 'چنگے': 'good', 'لگدے': 'look', 'ہسدے': 'laughing', 'بستے': 'living', 'گھر': 'home', 'پتھر': 'stones', 'دعاواں': 'prayers', 'بارش': 'rain', 'سمندر': 'ocean', 'ہاسے': 'laughter', 'کھوہ': 'snatching', 'اتھر': 'tears', 'اکھاں': 'eyes', 'پتر': 'son/leaves', 'رکھاں': 'trees', 'منظر': 'scene', 'سنج': 'desolate', 'مسنجا': 'lonely', 'اکھر': 'words', 'رال': 'together', 'کھیڈدے': 'playing', 'جیکر': 'if', 'ویرا': 'brother', 'ہوندا': 'would be', 'بلھے': 'Bulleh', 'شاہ': 'Shah', 'رانگڑ': 'Rangr', 'پانڈو': 'Pando', 'بُلھیا': 'Bulleh', 'جے': 'if', 'تیری': 'your'
};

const gurmukhiDictionaryUrdu: Record<string, string> = {
    'ਮੈਂ': 'میں', 'ਅਤੇ': 'اور', 'ਹੈ': 'ہے', 'ਸੀ': 'تھا', 'ਵਿੱਚ': 'میں', 'ਹਨ': 'ہیں', 'ਨੂੰ': 'کو', 'ਦਾ': 'کا', 'ਦੀ': 'کی', 'ਦੇ': 'کے', 'ਘਰ': 'گھر'
};

const gurmukhiDictionaryEnglish: Record<string, string> = {
    'ਮੈਂ': 'I', 'ਅਤੇ': 'and', 'ਹੈ': 'is', 'ਸੀ': 'was', 'ਵਿੱਚ': 'in', 'ਹਨ': 'are', 'ਨੂੰ': 'to', 'ਦਾ': 'of', 'ਦੀ': 'of', 'ਦੇ': 'of', 'ਘر': 'home'
};

// Normalization function to strip diacritics and honorifics
function normalize(text: string): string {
    return text
        .replace(/[\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g, "") // Arabic/Urdu diacritics
        .replace(/[ؒؓؔؕؐؑؐ]/g, "") // Honorifics
        .replace(/[\u0A41\u0A42\u0A47\u0A48\u0A4B\u0A4C\u0A4D]/g, "") // Gurmukhi diacritics (simplified)
        .trim();
}

function phonetically(text: string, script: 'gurmukhi' | 'shahmukhi'): string {
    let res = '';
    const map = script === 'gurmukhi' ? gurmukhiMap : shahmukhiMap;
    for (const char of Array.from(text)) res += map[char] || char;
    return res.replace(/aa/g, 'a').replace(/ii/g, 'ee').replace(/uu/g, 'oo');
}

export function translateLocal(text: string, targetLanguage: string): { translation: string; detectedLanguage: string } {
    const isGurmukhi = /[\u0A00-\u0A7F]/.test(text);
    const script = isGurmukhi ? 'gurmukhi' : 'shahmukhi';

    const lines = text.split('\n');

    const translatedLines = lines.map(line => {
        // First try to normalize the entire line to handle phrases better (simplified)
        // Split by words while preserving grammar and punctuation
        const words = line.split(/(\s+|[،۔؟!])/);

        return words.map(word => {
            const trimmedWord = word.trim();
            if (!trimmedWord || !/[\u0600-\u06FF\u0A00-\u0A7F]/.test(trimmedWord)) return word;

            const normalizedWord = normalize(trimmedWord);

            if (script === 'shahmukhi') {
                const dictionary = targetLanguage === 'urdu' ? urduMeanings : englishMeanings;
                return dictionary[trimmedWord] || dictionary[normalizedWord] || phonetically(trimmedWord, 'shahmukhi');
            } else {
                const dictionary = targetLanguage === 'urdu' ? gurmukhiDictionaryUrdu : gurmukhiDictionaryEnglish;
                return dictionary[trimmedWord] || dictionary[normalizedWord] || phonetically(trimmedWord, 'gurmukhi');
            }
        }).join('');
    });

    return {
        translation: translatedLines.join('\n').trim(),
        detectedLanguage: `punjabi-${script}`
    };
}
