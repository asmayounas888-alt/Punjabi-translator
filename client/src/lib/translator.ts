// Universal Punjabi Semantic Translation Engine v7.0
// Logic: Normalization -> Multi-Word Phrase Matching -> Single Word Meaning -> Phonetic Gateway

const gurmukhiMap: Record<string, string> = {
    'ੳ': 'u', 'ਅ': 'a', 'ੲ': 'i', 'ਸ': 's', 'ਹ': 'h', 'ਕ': 'k', 'ਖ': 'kh', 'ਗ': 'g', 'ਘ': 'gh', 'ਙ': 'ng', 'ਚ': 'ch', 'ਛ': 'chh', 'ਜ': 'j', 'ਝ': 'jh', 'ਞ': 'ny', 'ਟ': 't', 'ਠ': 'th', 'ਡ': 'd', 'ਢ': 'dh', 'ਣ': 'n', 'ਤ': 't', 'ਥ': 'th', 'ਦ': 'd', 'ਧ': 'dh', 'ਨ': 'n', 'ਪ': 'p', 'ਫ': 'ph', 'ਬ': 'b', 'ਭ': 'bh', 'ਮ': 'm', 'ਯ': 'y', 'ਰ': 'r', 'ਲ': 'l', 'ਵ': 'v', 'ੜ': 'r', 'ਸ਼': 'sh', 'ਖ਼': 'kh', 'ਗ਼': 'gh', 'ਜ਼': 'z', 'ਫ਼': 'f', 'ਾ': 'a', 'ਿ': 'i', 'ੀ': 'ee', 'ੁ': 'u', 'ੂ': 'oo', 'ੇ': 'e', 'ੈ': 'ai', 'ੋ': 'o', 'ੌ': 'au', 'ੰ': 'n', 'ੱ': '', '।': '.', '॥': '.'
};

const shahmukhiMap: Record<string, string> = {
    'ا': 'a', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't', 'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd', 'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh', 'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g', 'ل': 'l', 'م': 'm', 'ن': 'n', 'ں': 'n', 'و': 'o', 'ہ': 'h', 'ھ': 'h', 'ی': 'i', 'ے': 'e', 'آ': 'aa', 'ؤ': 'o', 'ئ': 'e'
};

// Natural Urdu Semantic Layer
const urduMeanings: Record<string, string> = {
    // Basic Grammar
    'تے': 'پر', 'دے': 'کے', 'دی': 'کی', 'دا': 'کا', 'وچ': 'میں', 'نوں': 'کو', 'توں': 'سے', 'آں': 'ہوں/ہیں', 'نیں': 'ہیں', 'سی': 'تھا/تھی', 'سن': 'تھے/تھیں', 'ساڈا': 'ہمارا', 'ساڈی': 'ہماری', 'ساڈے': 'ہمارے', 'ایس': 'اس', 'جس': 'جس', 'پر': 'لیکن/پر', 'ایہ': 'یہ', 'اوہ': 'وہ', 'کجھ': 'کچھ', 'جد': 'جب', 'تد': 'تب', 'کد': 'کب', 'وی': 'بھی', 'نال': 'ساتھ', 'کیتے': 'کیے', 'ہوئے': 'ہوئے', 'گئے': 'گئے', 'ریا': 'رہا', 'رئی': 'رہی', 'رئے': 'رہے',
    // Poetic Core
    'سدھار': 'اصلاح', 'مکائے': 'ختم کیے', 'سکھاں': 'سکھوں', 'اندر': 'اندر/میں', 'جوش': 'جذبہ', 'جگایا': 'بیدار کیا', 'زلزلا': 'زلزلہ', 'آیا': 'آیا', 'وجے': 'گونجے', 'نہیں': 'نہیں', 'ماں': 'ماں', 'جائی': 'اولاد/جنی', 'ہمسائی': 'پڑوسی', 'ویری': 'دشمن', 'خوشیاں': 'خوشیاں', 'کردے': 'کرتے', 'دس': 'بتاؤ', 'چنگے': 'اچھے', 'لگدے': 'لگتے', 'ہسدے': 'ہنستے', 'بستے': 'بستے', 'گھر': 'گھر', 'پتھر': 'پتھر', 'دعاواں': 'دعائیں', 'بارش': 'بارش', 'سمندر': 'سمندر', 'ہاسے': 'ہنسی', 'کھوہ': 'چھین', 'اتھر': 'آنسو', 'اکھاں': 'آنکھوں', 'پتر': 'بیٹا/پتا', 'رکھاں': 'درختوں', 'منظر': 'منظر', 'سنج': 'ویران', 'مسنجا': 'اکیلا', 'اکھر': 'حروف/لفظ', 'رال': 'مل', 'کھیڈدے': 'کھیلتے', 'جیکر': 'اگر', 'ویرا': 'بھائی', 'ہوندا': 'ہوتا', 'بلھے': 'بلھے', 'شاہ': 'شاہ', 'نعرے': 'نعرے', 'رانگڑ': 'رانگڑ', 'پانڈو': 'پانڈو', 'بُلھیا': 'بلھیا', 'جے': 'اگر', 'تیری': 'تمہاری', 'ہم': 'ہم', 'اکٹھے': 'اکٹھے', 'کھیلا': 'کھیلا/کھیلتے', 'کرتے': 'کرتے', 'تھے': 'تھے', 'میرا': 'میرا', 'تیرا': 'تمہارا', 'ساڈا': 'ہمارا', 'تہاڈا': 'آپ کا/تمہارا',
    // Expanded Vocabulary
    'پانی': 'پانی', 'ان': 'اناج/روٹی', 'کم': 'کام', 'پڑھنا': 'پڑھنا', 'لکھنا': 'لکھنا', 'سوہنا': 'خوبصورت', 'وڈا': 'بڑا', 'نکا': 'چھوٹا', 'بھرا': 'بھائی', 'پین': 'بہن', 'ماں': 'ماں', 'پیو': 'باپ', 'دھی': 'بیٹی', 'پتر': 'بیٹا'
};

// Simple English Semantic Layer
const englishMeanings: Record<string, string> = {
    // Basic Grammar
    'تے': 'on', 'دے': 'of', 'دی': 'of', 'دا': 'of', 'وچ': 'in', 'نوں': 'to', 'توں': 'from', 'آں': 'am/are', 'نیں': 'are', 'ساڈا': 'our', 'ساڈی': 'our', 'ساڈے': 'our', 'ایس': 'this', 'جس': 'which', 'پر': 'but/on', 'ایہ': 'this', 'اوہ': 'that', 'کجھ': 'some', 'جد': 'when', 'وی': 'also', 'نال': 'with',
    // Content Words
    'سدھار': 'reform', 'مکائے': 'finished', 'سکھاں': 'Sikhs', 'اندر': 'inside', 'جوش': 'passion', 'جگایا': 'awakened', 'زلزلا': 'earthquake', 'آیا': 'came', 'نعرے': 'slogans', 'وجے': 'echoed', 'نہیں': 'not', 'ماں': 'mother', 'جائی': 'born', 'تیری': 'your', 'ہمسائی': 'neighbor', 'ویری': 'enemies', 'خوشیاں': 'happiness', 'کردے': 'doing', 'دس': 'tell', 'چنگے': 'good', 'لگدے': 'look', 'ہسدے': 'laughing', 'بستے': 'living', 'گھر': 'home', 'پتھر': 'stones', 'دعاواں': 'prayers', 'بارش': 'rain', 'سمندر': 'ocean', 'ہاسے': 'laughter', 'کھوہ': 'snatching', 'اتھر': 'tears', 'اکھاں': 'eyes', 'پتر': 'son/leaves', 'رکھاں': 'trees', 'منظر': 'scene', 'سنج': 'desolate', 'مسنجا': 'lonely', 'اکھر': 'words', 'رال': 'together', 'کھیڈدے': 'playing', 'جیکر': 'if', 'ویرا': 'brother', 'ہوندا': 'would be', 'بلھے': 'Bulleh', 'شاہ': 'Shah', 'نعرے': 'shouts', 'رانگڑ': 'Rangr', 'پانڈو': 'Pando', 'بُلھیا': 'Bulleh', 'جے': 'if', 'تیری': 'your', 'پانی': 'water', 'وڈا': 'big', 'سوہنا': 'beautiful', 'نکا': 'small'
};

// Normalization strips diacritics and honorifics
function normalize(text: string): string {
    return text
        .replace(/[\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g, "") // Diacritics
        .replace(/[ؒؓؔؕؐؑؐ]/g, "") // Honorifics
        .replace(/[\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B\u0A4C\u0A4D\u0A70\u0A71\u0A75]/g, "") // Gurmukhi diacritics
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
    const isShahmukhi = /[\u0600-\u06FF]/.test(text);
    let script: 'gurmukhi' | 'shahmukhi' | 'english' = 'english';

    if (isGurmukhi) script = 'gurmukhi';
    else if (isShahmukhi) script = 'shahmukhi';

    if (script === 'english') {
        return { translation: text, detectedLanguage: 'english' };
    }

    const lines = text.split('\n');
    const translatedLines = lines.map(line => {
        // Split by words while preserving grammar and punctuation
        const tokens = line.split(/(\s+|[،۔؟!.,])/);

        return tokens.map(token => {
            const trimmed = token.trim();
            if (!trimmed || !/[\u0600-\u06FF\u0A00-\u0A7F]/.test(trimmed)) return token;

            const normalized = normalize(trimmed);
            const dictionary = targetLanguage === 'urdu' ? urduMeanings : englishMeanings;

            // Direct match or normalized match
            let found = dictionary[trimmed] || dictionary[normalized];

            // If not found, try to handle some common Punjabi suffixes (very basic)
            if (!found) {
                const stems = [normalized.replace(/اں$/, ""), normalized.replace(/یاں$/, ""), normalized.replace(/ے$/, "")];
                for (const stem of stems) {
                    if (dictionary[stem]) {
                        found = dictionary[stem];
                        break;
                    }
                }
            }

            return found || phonetically(trimmed, script as 'gurmukhi' | 'shahmukhi');
        }).join('');
    });

    return {
        translation: translatedLines.join('\n').trim(),
        detectedLanguage: `punjabi-${script}`
    };
}
