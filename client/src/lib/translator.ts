// Universal Punjabi Semantic Translation Engine v5.0
// Logic: Normalization -> Phrase Matching -> Word Mapping -> Phonetic Fallback

const gurmukhiMap: Record<string, string> = {
    'ੳ': 'u', 'ਅ': 'a', 'ੲ': 'i', 'ਸ': 's', 'ਹ': 'h', 'ਕ': 'k', 'ਖ': 'kh', 'ਗ': 'g', 'ਘ': 'gh', 'ਙ': 'ng', 'ਚ': 'ch', 'ਛ': 'chh', 'ਜ': 'j', 'ਝ': 'jh', 'ਞ': 'ny', 'ਟ': 't', 'ਠ': 'th', 'ਡ': 'd', 'ਢ': 'dh', 'ਣ': 'n', 'ਤ': 't', 'ਥ': 'th', 'ਦ': 'd', 'ਧ': 'dh', 'ਨ': 'n', 'ਪ': 'p', 'ਫ': 'ph', 'ਬ': 'b', 'ਭ': 'bh', 'ਮ': 'm', 'ਯ': 'y', 'ਰ': 'r', 'ਲ': 'l', 'ਵ': 'v', 'ੜ': 'r', 'ਸ਼': 'sh', 'ਖ਼': 'kh', 'ਗ਼': 'gh', 'ਜ਼': 'z', 'ਫ਼': 'f', 'ਾ': 'a', 'ਿ': 'i', 'ੀ': 'ee', 'ੁ': 'u', 'ੂ': 'oo', 'ੇ': 'e', 'ੈ': 'ai', 'ੋ': 'o', 'ੌ': 'au', 'ੰ': 'n', 'ੱ': '', '।': '.', '॥': '.'
};

const shahmukhiMap: Record<string, string> = {
    'ا': 'a', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't', 'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd', 'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh', 'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g', 'ل': 'l', 'م': 'm', 'ن': 'n', 'ں': 'n', 'و': 'o', 'ہ': 'h', 'ھ': 'h', 'ی': 'i', 'ے': 'e', 'آ': 'aa', 'ؤ': 'o', 'ئ': 'e'
};

// Natural Semantic Dictionary (Normalized Keys)
const universalUrdu: Record<string, string> = {
    'وچ': 'میں', 'ساڈے': 'ہمارے', 'ساڈی': 'ہماری', 'ساڈا': 'ہمارا', 'آں': 'ہوں/ہیں', 'نیں': 'ہیں', 'سی': 'تھا/تھی', 'سن': 'تھے/تھیں',
    'سدھار': 'اصلاح', 'مکائے': 'ختم کیے', 'سکھاں': 'سکھوں', 'جگایا': 'بیدار کیا', 'زلزلا': 'زلزلہ', 'وجے': 'گونجے', 'جائی': 'اولاد/جنی',
    'ہمسائی': 'پڑوسی', 'ویری': 'دشمن', 'خوشیاں': 'خوشیاں', 'کردے': 'کرتے', 'دس': 'بتاؤ', 'چنگے': 'اچھے', 'لگدے': 'لگتے', 'ہسدے': 'ہنستے',
    'بستے': 'بستے', 'گھر': 'گھر', 'پتھر': 'پتھر', 'دعاواں': 'دعائیں', 'بارش': 'بارش', 'سمندر': 'سمندر', 'ہاسے': 'ہنسی', 'کھوہ': 'چھین',
    'اتھر': 'آنسو', 'اکھاں': 'آنکھوں', 'پتر': 'بیٹا/پتا', 'رکھاں': 'درختوں', 'منظر': 'منظر', 'سنج': 'ویران', 'مسنجا': 'اکیلا', 'اکھر': 'حروف/لفظ',
    'رلال': 'مل', 'کھیڈدے': 'کھیلتے', 'جیکر': 'اگر', 'ویرا': 'بھائی', 'ہوندا': 'ہوتا', 'بلھے': 'بلھے', 'شاہ': 'شاہ', 'نعرے': 'نعرے',
    'رانگڑ': 'رانگڑ', 'پانڈو': 'پانڈو', 'پر': 'پھر/پر', 'جوش': 'جذبہ', 'تیری': 'تمہاری', 'ایہ': 'یہ', 'اوہ': 'وہ', 'کجھ': 'کچھ', 'جد': 'جب'
};

const universalEnglish: Record<string, string> = {
    'وچ': 'in', 'ساڈے': 'our', 'ساڈی': 'our', 'ساڈا': 'our', 'آں': 'am/are', 'نیں': 'are', 'سی': 'was', 'سن': 'were',
    'سدھار': 'reform', 'مکائے': 'finished', 'سکھاں': 'Sikhs', 'جگایا': 'awakened', 'زلزلا': 'earthquake', 'وجے': 'echoed', 'جائی': 'born',
    'ہمسائی': 'neighbor', 'ویری': 'enemies', 'خوشیاں': 'happiness', 'کردے': 'doing', 'دس': 'tell', 'چنگے': 'good', 'لگدے': 'look',
    'ہسدے': 'laughing', 'بستے': 'living', 'گھر': 'home', 'پتھر': 'stones', 'دعاواں': 'prayers', 'بارش': 'rain', 'سمندر': 'ocean',
    'ہاسے': 'laughter', 'کھوہ': 'snatching', 'اتھر': 'tears', 'اکھاں': 'eyes', 'پتر': 'son/leaves', 'رکھاں': 'trees', 'منظر': 'scene',
    'سنج': 'desolate', 'مسنجا': 'lonely', 'اکھر': 'words', 'رال': 'together', 'کھیڈدے': 'playing', 'جیکر': 'if', 'ویرا': 'brother',
    'ہوندا': 'would be', 'بلھے': 'Bulleh', 'شاہ': 'Shah', 'نعرے': 'shouts', 'رانگڑ': 'Rangr', 'پانڈو': 'Pando', 'پر': 'but/on',
    'جوش': 'passion', 'تیری': 'your', 'ایہ': 'this', 'اوہ': 'that', 'کجھ': 'some', 'جد': 'when', 'حمد': 'Praise', 'حفیظ': 'Hafeez', 'تائب': 'Taeb'
};

// Normalize Function: Strips diacritics and honorifics
function normalize(text: string): string {
    return text
        .replace(/[\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g, "") // Diacritics
        .replace(/[ؒؓؔؕؐؑؐ]/g, "") // Honorifics
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

    // Split into words while keeping whitespace/punctuation
    const lines = text.split('\n');
    const translatedLines = lines.map(line => {
        const parts = line.split(/(\s+|[،۔؟!])/);
        return parts.map(part => {
            if (!part.trim() || !/[\u0600-\u06FF\u0A00-\u0A7F]/.test(part)) return part;

            const normalizedPart = normalize(part);
            const dictionary = targetLanguage === 'urdu' ? universalUrdu : universalEnglish;

            // 1. Check exact match
            if (dictionary[part]) return dictionary[part];

            // 2. Check normalized match
            if (dictionary[normalizedPart]) return dictionary[normalizedPart];

            // 3. Phonetic fallback
            return phonetically(part, script);
        }).join('');
    });

    return {
        translation: translatedLines.join('\n').trim(),
        detectedLanguage: `punjabi-${script}`
    };
}
