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
    'ا': 'a', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 'tt', 'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd', 'ڈ': 'dd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'rr', 'ز': 'z', 'ژ': 'zh', 'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g', 'ل': 'l', 'م': 'm', 'ن': 'n', 'ں': 'n', 'و': 'w', 'ہ': 'h', 'ھ': 'h', 'ی': 'i', 'ے': 'e',
    'آ': 'aa', 'ؤ': 'o', 'ئ': 'e', ' ': ' ', '\n': '\n'
};

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
    'جਦੋਂ': { english: 'when', urdu: 'جب' },
    'ਜਿੱਥੇ': { english: 'where', urdu: 'جہاں' },
    'ਘਰ': { english: 'home', urdu: 'گھر' },
    'ਪਾਣੀ': { english: 'water', urdu: 'پانی' },
    'ਰੋਟੀ': { english: 'bread', urdu: 'روٹی' },
    'ਨਾਮ': { english: 'name', urdu: 'نام' },
    'ਧੰਨਵਾਦ': { english: 'thank you', urdu: 'شکریہ' },
    'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ': { english: 'hello', urdu: 'سلام' },
    // Shahmukhi Common Words
    'وچ': { english: 'in', urdu: 'میں' },
    'آں': { english: 'am/are', urdu: 'ہوں/ہیں' },
    'نیں': { english: 'are', urdu: 'ہیں' },
    'ساڈے': { english: 'our', urdu: 'ہمارے' },
    'ساڈی': { english: 'our', urdu: 'ہماری' },
    'ایس': { english: 'this', urdu: 'اس' },
    'جس': { english: 'which', urdu: 'جس' },
    'کھَوہ': { english: 'snatch', urdu: 'چھین' },
    'اتھر': { english: 'tear', urdu: 'آنسو' },
    'دھرتی': { english: 'earth', urdu: 'زمین' },
    'ہوندے': { english: 'becoming', urdu: 'ہوتے' },
    'ہاسے': { english: 'laughter', urdu: 'ہنسی' },
    'پتر': { english: 'leaf', urdu: 'پتہ' },
    'رُکھاں': { english: 'trees', urdu: 'درختوں' },
    'سُنج': { english: 'desolate', urdu: 'ویران' },
    'مسنجا': { english: 'lonely', urdu: 'اکیلا' },
    'اکھر': { english: 'words', urdu: 'الفاظ' },
    'جی': { english: 'yes/sir', urdu: 'جی' },
    'بُلھا': { english: 'Bulleh', urdu: 'بُلھا' },
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

function transliterateGurmukhiToEnglish(text: string): string {
    let result = '';
    const chars = Array.from(text);

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

function transliterateShahmukhiToEnglish(text: string): string {
    let result = '';
    const chars = Array.from(text);

    for (const char of chars) {
        if (shahmukhiToEnglishMap[char]) {
            result += shahmukhiToEnglishMap[char];
        } else {
            result += char;
        }
    }
    return result;
}

function transliterateToUrdu(text: string): string {
    let result = '';
    const chars = Array.from(text);

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

export function translateLocal(text: string, targetLanguage: string): { translation: string; detectedLanguage: string } {
    const detectedLanguage = detectLanguage(text);
    let translation = '';

    if (detectedLanguage === 'punjabi-gurmukhi') {
        const words = text.split(/(\s+)/);
        const translatedWords = words.map(word => {
            const trimmed = word.trim();
            if (commonWords[trimmed]) {
                return targetLanguage === 'english' ? commonWords[trimmed].english : commonWords[trimmed].urdu;
            }
            return targetLanguage === 'english' ? transliterateGurmukhiToEnglish(word) : transliterateToUrdu(word);
        });
        translation = translatedWords.join('');
    } else if (detectedLanguage === 'punjabi-shahmukhi') {
        const words = text.split(/(\s+)/);
        const translatedWords = words.map(word => {
            const trimmed = word.trim();
            if (commonWords[trimmed]) {
                return targetLanguage === 'english' ? commonWords[trimmed].english : commonWords[trimmed].urdu;
            }
            // For Urdu target, Shahmukhi is already the same script, so we mostly keep it but can refine
            if (targetLanguage === 'urdu') return word;
            return transliterateShahmukhiToEnglish(word);
        });
        translation = translatedWords.join('');
    } else if (detectedLanguage === 'english') {
        translation = `[Note: This tool specializes in Punjabi (Gurmukhi/Shahmukhi). Transliterating English to Punjabi coming soon.]\n\nOriginal: ${text}`;
    } else {
        translation = text;
    }

    return { translation, detectedLanguage };
}
