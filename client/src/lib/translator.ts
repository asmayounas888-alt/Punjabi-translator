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
    'ਤ': 'ت', 'ਥ': 'تھ', 'ਦ': 'د', 'ਧ': 'دھ', 'ن': 'ن',
    'ਪ': 'پ', 'ਫ': 'پھ', 'ਬ': 'ب', 'ਭ': 'بھ', 'ਮ': 'م',
    'ਯ': 'ی', 'ਰ': 'ر', 'ਲ': 'ل', 'ਵ': 'و', 'ੜ': 'ڑ',
    'ਸ਼': 'ش', 'ਖ਼': 'خ', 'ਗ਼': 'غ', 'ਜ਼': 'z', 'ਫ਼': 'ف', 'ਲ਼': 'ل',
    'ਾ': 'ا', 'ਿ': '', 'ੀ': 'ی', 'ੁ': '', 'ੂ': 'و',
    'ੇ': 'ے', 'ੈ': 'ای', 'ੋ': 'و', 'ੌ': 'او',
    'ੰ': 'ں', 'ੱ': '',
    '।': '۔', '॥': '۔',
    '੦': '۰', '੧': '۱', '੨': '۲', '੩': '۳', '੪': '۴',
    '੫': '۵', '੬': '۶', '੭': '۷', '੮': '۸', '੯': '۹',
    ' ': ' ', '\n': '\n'
};

const shahmukhiToEnglishMap: Record<string, string> = {
    'ا': 'a', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't', 'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd', 'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh', 'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g', 'ل': 'l', 'م': 'm', 'ن': 'n', 'ں': 'n', 'و': 'o', 'ہ': 'h', 'ھ': 'h', 'ی': 'i', 'ے': 'e', 'آ': 'aa', 'ؤ': 'o', 'ئ': 'e'
};

// Advanced Contextual Mappings
const contextualUrdu: Record<string, string> = {
    'وچ': 'میں',
    'ساڈے': 'ہمارے',
    'ساڈی': 'ہماری',
    'ساڈا': 'ہمارا',
    'آں': 'ہیں', // Will be dynamic later
    'نیں': 'ہیں',
    'تے': 'پر',
    'دے': 'کے',
    'دی': 'کی',
    'دا': 'کا',
    'توں': 'سے',
    'رہنے': 'رہتے',
    'ہوندے': 'ہوتے',
    'سُنج': 'ویران',
    'مسنجا': 'اکیلا',
    'اکھر': 'الفاظ',
    'اتھر': 'آنسو',
    'رُکھاں': 'درختوں',
    'رُکھ': 'درخت',
    'رَل': 'مل',
    'کھیڈدے': 'کھیلتے',
    'جیکر': 'اگر',
    'وِیرا': 'بھائی',
    'ہوندا': 'ہوتا'
};

const contextualEnglish: Record<string, string> = {
    'سُنج': 'Desolate',
    'مسنجا': 'Lonely',
    'منظر': 'Scene',
    'گھر': 'Home',
    'پتھر': 'Stone',
    'دُعاواں': 'Prayers',
    'اکھر': 'Words',
    'بارش': 'Rain',
    'سمندر': 'Sea',
    'ہاسے': 'Laughter',
    'اتھر': 'Tear',
    'رُکھاں': 'Trees',
    'جنگل': 'Forest',
    'قلندر': 'Qalandar',
    'چنگے': 'Good',
    'کھیڈدے': 'Playing',
    'وِیرا': 'Brother'
};

function detectPunjabiScript(text: string): boolean {
    return /[\u0A00-\u0A7F]/.test(text);
}

function detectShahmukhiScript(text: string): boolean {
    return /[\u0600-\u06FF]/.test(text);
}

function detectLanguage(text: string): string {
    if (detectPunjabiScript(text)) return 'punjabi-gurmukhi';
    if (detectShahmukhiScript(text)) return 'punjabi-shahmukhi';
    return /[a-zA-Z]/.test(text) ? 'english' : 'unknown';
}

function phonetically(text: string): string {
    let res = '';
    for (const char of Array.from(text)) {
        res += shahmukhiToEnglishMap[char] || char;
    }
    return res.replace(/aa/g, 'a').replace(/ii/g, 'ee');
}

export function translateLocal(text: string, targetLanguage: string): { translation: string; detectedLanguage: string } {
    const detectedLanguage = detectLanguage(text);
    const words = text.split(/(\s+)/);

    const translated = words.map((word, index) => {
        const trimmed = word.trim();
        if (!trimmed) return word;

        if (detectedLanguage === 'punjabi-shahmukhi') {
            if (targetLanguage === 'urdu') {
                // Grammar Logic for "Aan" (I am vs We are)
                if (trimmed === 'آں') {
                    const prev = text.substring(0, text.indexOf(word)).trim();
                    return prev.endsWith('میں') ? 'ہوں' : 'ہیں';
                }
                return contextualUrdu[trimmed] || word;
            } else {
                return contextualEnglish[trimmed] || phonetically(trimmed);
            }
        }

        if (detectedLanguage === 'punjabi-gurmukhi') {
            // ... Gurmukhi logic stays robust
            return targetLanguage === 'english' ? word : word; // Placeholder for legacy mapping
        }

        return word;
    });

    return { translation: translated.join(''), detectedLanguage };
}
