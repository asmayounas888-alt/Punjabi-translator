// Universal Punjabi Semantic Translation Engine v9.0
// Logic: Normalization -> Multi-Word Phrase Recognition -> Script Bridge -> Natural Semantic Mapping -> Smart Phonetic Fallback

const gurmukhiMap: Record<string, string> = {
    'ੳ': 'u', 'ਅ': 'a', 'ੲ': 'i', 'ਸ': 's', 'ਹ': 'h', 'ਕ': 'k', 'ਖ': 'kh', 'ਗ': 'g', 'ਘ': 'gh', 'ਙ': 'ng', 'ਚ': 'ch', 'ਛ': 'chh', 'ਜ': 'j', 'ਝ': 'jh', 'ਞ': 'ny', 'ਟ': 't', 'ਠ': 'th', 'ਡ': 'd', 'ਢ': 'dh', 'ਣ': 'n', 'ਤ': 't', 'ਥ': 'th', 'ਦ': 'd', 'ਧ': 'dh', 'ਨ': 'n', 'ਪ': 'p', 'ਫ': 'ph', 'ਬ': 'b', 'ਭ': 'bh', 'ਮ': 'm', 'ਯ': 'y', 'ਰ': 'r', 'ਲ': 'l', 'ਵ': 'v', 'ੜ': 'r', 'ਸ਼': 'sh', 'ਖ਼': 'kh', 'ਗ਼': 'gh', 'ਜ਼': 'z', 'ਫ਼': 'f', 'ਾ': 'a', 'ਿ': 'i', 'ੀ': 'ee', 'ੁ': 'u', 'ੂ': 'oo', 'ੇ': 'e', 'ੈ': 'ai', 'ੋ': 'o', 'ੌ': 'au', 'ੰ': 'n', 'ੱ': '', '।': '.', '॥': '.'
};

const shahmukhiMap: Record<string, string> = {
    'ا': 'a', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't', 'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'kh': 'kh', 'د': 'd', 'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh', 'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g', 'ل': 'l', 'م': 'm', 'ن': 'n', 'ں': 'n', 'و': 'o', 'ہ': 'h', 'ھ': 'h', 'ی': 'i', 'ے': 'e', 'آ': 'aa', 'ؤ': 'o', 'ئ': 'e'
};

// --- NATURAL SEMANTIC DICTIONARIES ---

const naturalUrdu: Record<string, string> = {
    // Phrases (Longest match first)
    'بلھے شاہ': 'بلھے شاہ',
    'سکھاں اندر': 'سکھوں کے دل میں',
    'جوش جگایا': 'جذبہ بیدار کیا',
    'سدھار مکائے': 'اصلاح ختم کی',
    'چنگے لگدے': 'اچھے لگتے ہیں',
    'گھر ہسدے بستے': 'گھر ہنستے بستے',
    'ماں جائی': 'سگی بہن/اولاد',
    // Words
    'تے': 'پر', 'دے': 'کے', 'دی': 'کی', 'دا': 'کا', 'وچ': 'میں', 'نوں': 'کو', 'توں': 'سے', 'ساڈا': 'ہمارا', 'ساڈی': 'ہماری', 'ساڈے': 'ہمارے', 'ایہ': 'یہ', 'اوہ': 'وہ', 'کجھ': 'کچھ', 'جد': 'جب', 'تد': 'تب', 'وی': 'بھی', 'نال': 'ساتھ', 'آں': 'ہوں/ہیں', 'نیں': 'ہیں', 'سی': 'تھا/تھی', 'سن': 'تھے/تھیں',
    'سدھار': 'اصلاح', 'مکائے': 'ختم کیے', 'سکھاں': 'سکھوں', 'اندر': 'اندر', 'جوش': 'جذبہ', 'جگایا': 'بیدار کیا', 'زلزلا': 'زلزلہ', 'آیا': 'آیا', 'وجے': 'گونجے', 'نہیں': 'نہیں', 'ماں': 'ماں', 'جائی': 'اولاد', 'ہمسائی': 'پڑوسی', 'ویری': 'دشمن', 'خوشیاں': 'خوشیاں', 'کردے': 'کرتے', 'دس': 'بتاؤ', 'چنگے': 'اچھے', 'لگدے': 'لگتے', 'ہسدے': 'ہنستے', 'بستے': 'بستے', 'گھر': 'گھر', 'پتھر': 'پتھر', 'دعاواں': 'دعائیں', 'بارش': 'بارش', 'سمندر': 'سمندر', 'ہاسے': 'ہنسی/قہقہے', 'کھوہ': 'چھین', 'اتھر': 'آنسو', 'اکھاں': 'آنکھوں', 'پتر': 'بیٹا/پتا', 'رکھاں': 'درختوں', 'منظر': 'منظر', 'سنج': 'ویران', 'مسنجا': 'اکیلا', 'اکھر': 'حروف/لفظ', 'رال': 'مل/اکٹھے', 'کھیڈدے': 'کھیلتے', 'جیکر': 'اگر', 'ویرا': 'بھائی', 'ہوندا': 'ہوتا', 'تیری': 'تمہاری', 'جے': 'اگر', 'تیرا': 'تمہارا', 'میرا': 'میرا', 'ہونا': 'ہونا', 'کرنا': 'کرنا', 'جانا': 'جانا', 'ایدا': 'اس کا', 'اودا': 'اس کا', 'ایتھے': 'یہاں', 'اوتھے': 'وہاں', 'کیویں': 'کیسے', 'کیوں': 'کیوں', 'ہک': 'ایک'
};

const simpleEnglish: Record<string, string> = {
    // Phrases
    'سکھاں اندر': 'inside path of Sikhs',
    'جوش جگایا': 'awakened the spirit',
    'سدھار مکائے': 'abolished the reforms',
    'چنگے لگدے': 'look good',
    'ہسدے بستے': 'happy and settled',
    // Words
    'تے': 'on', 'دے': 'of', 'دی': 'of', 'دا': 'of', 'وچ': 'in', 'نوں': 'to', 'توں': 'from', 'ساڈا': 'our', 'ساڈی': 'our', 'ساڈے': 'our', 'ایہ': 'this', 'اوہ': 'that', 'کجھ': 'some', 'جد': 'when', 'وی': 'also', 'نال': 'with', 'آں': 'am/are', 'نیں': 'are', 'سی': 'was', 'سن': 'were',
    'سدھار': 'reform', 'مکائے': 'finished', 'سکھاں': 'Sikhs', 'اندر': 'inside', 'جوش': 'passion', 'جگایا': 'awakened', 'زلزلا': 'earthquake', 'آیا': 'came', 'نعرے': 'slogans', 'وجے': 'echoed', 'نہیں': 'not', 'ماں': 'mother', 'جائی': 'born', 'تیری': 'your', 'ہمسائی': 'neighbor', 'ویری': 'enemies', 'خوشیاں': 'happiness', 'کردے': 'doing', 'دس': 'tell', 'چنگے': 'good', 'لگدے': 'look', 'ہسدے': 'laughing', 'بستے': 'living', 'گھر': 'home', 'پتھر': 'stones', 'دعاواں': 'prayers', 'بارش': 'rain', 'سمندر': 'ocean', 'ہاسے': 'laughter', 'کھوہ': 'snatch', 'اتھر': 'tears', 'اکھاں': 'eyes', 'پتر': 'son/leaves', 'رکھاں': 'trees', 'منظر': 'scene', 'سنج': 'desolate', 'مسنجا': 'lonely', 'اکھر': 'words', 'رال': 'together', 'کھیڈدے': 'playing', 'جیکر': 'if', 'ویرا': 'brother', 'ہوندا': 'would be', 'بلھے': 'Bulleh', 'شاہ': 'Shah', 'رانگڑ': 'Rangr', 'پانڈو': 'Pando', 'جے': 'if', 'وڈا': 'big', 'سوہنا': 'beautiful', 'نکا': 'small', 'بھرا': 'brother', 'پین': 'sister', 'دھی': 'daughter', 'پیو': 'father', 'پانی': 'water', 'روٹی': 'bread', 'کم': 'work', 'نام': 'name'
};

const scriptBridge: Record<string, string> = {
    'ਮੈਂ': 'میں', 'ਅਤੇ': 'اور', 'ਹੈ': 'ہے', 'ਸੀ': 'تھا', 'ਵਿੱਚ': 'وچ', 'ਹਨ': 'ہیں', 'ਨੂੰ': 'نوں', 'ਦਾ': 'دا', 'ਦੀ': 'دی', 'ਦੇ': 'دے', 'ਘਰ': 'گھر', 'ਨਾਮ': 'نان', 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ': 'سلام',
    'ਸਦ੍ਹਾਰ': 'سدھار', 'ਸਿੱਖਾਂ': 'سکھاں', 'ਅੰਦਰ': 'اندر', 'ਜੋਸ਼': 'جوش', 'ਜਗਾਇਆ': 'جگایا', 'ਜ਼ਲਜ਼ਲਾ': 'زلزلہ', 'ਆਇਆ': 'آیا', 'ਨਆਰੇ': 'نعرے', 'ਵਜੇ': 'وجے', 'ਨਹੀਂ': 'نہیں', 'ਮਾਂ': 'ماں', 'ਜਾਈ': 'جائی', 'ਹਮਸਾਈ': 'ہمسائی', 'ਵੈਰੀ': 'ویری', 'ਖੁਸ਼ੀਆਂ': 'خوشیاں', 'ਕਰਦੇ': 'کردے', 'ਦੱਸ': 'دس', 'ਚੰਗੇ': 'چنگے', 'ਲੱਗਦੇ': 'لگدے', 'ਹੱਸਦੇ': 'ہسدے', 'ਬੱਸਦੇ': 'بستے', 'ਪੱਥਰ': 'پتھر', 'ਦੁਆਵਾਂ': 'دعاواں', 'ਬਾਰਿਸ਼': 'بارش', 'ਸਮੁੰਦਰ': 'سمندر', 'ਹਾਸੇ': 'ہاسے', 'ਖੋਹ': 'کھوہ', 'ਅੱਥਰੂ': 'اتھر', 'ਅੱਖਾਂ': 'اکھاں', 'ਪੁੱਤਰ': 'پتر', 'ਰੁੱਖਾਂ': 'رکھاں', 'ਮੰਜ਼ਰ': 'منظر', 'ਸੁੰਝ': 'سنج', 'ਮਸੰਜਾ': 'مسنجا', 'ਅੱਖਰ': 'اکھر', 'ਰਲ': 'رال', 'ਖੇਡਦੇ': 'کھیڈدے', 'ਜੇਕਰ': 'جیکر', 'ਵੀਰਾ': 'ویرا', 'ਹੁੰਦਾ': 'ہوندا', 'ਬੁਲ੍ਹੇ': 'بلھے'
};

// --- CORE UTILITIES ---

function normalize(text: string): string {
    return text
        .replace(/[\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g, "") // Diacritics
        .replace(/[ؒؓؔؕؐؑؐ]/g, "") // Symbols
        .replace(/[\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B\u0A4C\u0A4D\u0A70\u0A71\u0A75]/g, "") // Gurmukhi diacritics
        .trim();
}

function phonetically(text: string, script: 'gurmukhi' | 'shahmukhi'): string {
    let res = '';
    const map = script === 'gurmukhi' ? gurmukhiMap : shahmukhiMap;
    for (const char of Array.from(text)) res += map[char] || char;
    return res.replace(/aa/g, 'a').replace(/ii/g, 'ee').replace(/uu/g, 'oo');
}

// --- MAIN ENGINE ---

export function translateLocal(text: string, targetLanguage: string): { translation: string; detectedLanguage: string } {
    const isGurmukhi = /[\u0A00-\u0A7F]/.test(text);
    const isShahmukhi = /[\u0600-\u06FF]/.test(text);
    let masterScript: 'gurmukhi' | 'shahmukhi' | 'english' = 'english';

    if (isGurmukhi) masterScript = 'gurmukhi';
    else if (isShahmukhi) masterScript = 'shahmukhi';

    if (masterScript === 'english') return { translation: text, detectedLanguage: 'english' };

    const dictionary = targetLanguage === 'urdu' ? naturalUrdu : simpleEnglish;
    const lines = text.split('\n');

    const translatedLines = lines.map(line => {
        let currentLine = line;

        // 1. Script Normalization & Bridging (Gurmukhi to Shahmukhi semantic keys)
        if (masterScript === 'gurmukhi') {
            const words = currentLine.split(/(\s+|[،۔؟!.,])/);
            currentLine = words.map(word => {
                const trimmed = word.trim();
                if (!trimmed) return word;
                return scriptBridge[trimmed] || scriptBridge[normalize(trimmed)] || word;
            }).join('');
        }

        // 2. Phrase Replacement (Longest Phrases First)
        const sortedPhraseKeys = Object.keys(dictionary).filter(k => k.includes(' ')).sort((a, b) => b.length - a.length);
        sortedPhraseKeys.forEach(phrase => {
            const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            currentLine = currentLine.replace(regex, dictionary[phrase]);
        });

        // 3. Individual Word Replacement
        const parts = currentLine.split(/(\s+|[،۔؟!.,])/);
        return parts.map(part => {
            const trimmed = part.trim();
            if (!trimmed || !/[\u0600-\u06FF\u0A00-\u0A7F]/.test(trimmed)) return part;

            const normalized = normalize(trimmed);
            let result = dictionary[trimmed] || dictionary[normalized];

            // 4. Smart Stemming fallback
            if (!result) {
                const stems = [normalized.replace(/اں$/, ""), normalized.replace(/یاں$/, ""), normalized.replace(/ے$/, "")];
                for (const stem of stems) {
                    if (dictionary[stem]) {
                        result = dictionary[stem];
                        break;
                    }
                }
            }

            // 5. Final Phonetic fallback if no semantic meaning found
            // ONLY if the word still contains Punjabi characters
            if (!result && /[\u0600-\u06FF\u0A00-\u0A7F]/.test(trimmed)) {
                return phonetically(trimmed, masterScript as 'gurmukhi' | 'shahmukhi');
            }

            return result || part;
        }).join('');
    });

    return {
        translation: translatedLines.join('\n').trim(),
        detectedLanguage: `punjabi-${masterScript}`
    };
}
