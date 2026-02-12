// Universal Punjabi Semantic Translation Engine v8.0
// Logic: Script Normalization -> Script Bridging -> High-Fidelity Semantic Mapping -> Phonetic Gateway

const gurmukhiMap: Record<string, string> = {
    'ੳ': 'u', 'ਅ': 'a', 'ੲ': 'i', 'ਸ': 's', 'ਹ': 'h', 'ਕ': 'k', 'ਖ': 'kh', 'ਗ': 'g', 'ਘ': 'gh', 'ਙ': 'ng', 'ਚ': 'ch', 'ਛ': 'chh', 'ਜ': 'j', 'ਝ': 'jh', 'ਞ': 'ny', 'ਟ': 't', 'ਠ': 'th', 'ਡ': 'd', 'ਢ': 'dh', 'ਣ': 'n', 'ਤ': 't', 'ਥ': 'th', 'ਦ': 'd', 'ਧ': 'dh', 'ਨ': 'n', 'ਪ': 'p', 'ਫ': 'ph', 'ਬ': 'b', 'ਭ': 'bh', 'ਮ': 'm', 'ਯ': 'y', 'ਰ': 'r', 'ਲ': 'l', 'ਵ': 'v', 'ੜ': 'r', 'ਸ਼': 'sh', 'ਖ਼': 'kh', 'ਗ਼': 'gh', 'ਜ਼': 'z', 'ਫ਼': 'f', 'ਾ': 'a', 'ਿ': 'i', 'ੀ': 'ee', 'ੁ': 'u', 'ੂ': 'oo', 'ੇ': 'e', 'ੈ': 'ai', 'ੋ': 'o', 'ੌ': 'au', 'ੰ': 'n', 'ੱ': '', '।': '.', '॥': '.'
};

const shahmukhiMap: Record<string, string> = {
    'ا': 'a', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't', 'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd', 'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh', 'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g', 'ل': 'l', 'م': 'm', 'ن': 'n', 'ں': 'n', 'و': 'o', 'ہ': 'h', 'ھ': 'h', 'ی': 'i', 'ے': 'e', 'آ': 'aa', 'ؤ': 'o', 'ئ': 'e'
};

/**
 * Universal Script Bridge: Maps Gurmukhi words to their Shahmukhi semantic counterparts.
 * This ensures Gurmukhi users get the same high-quality semantic translations.
 */
const scriptBridge: Record<string, string> = {
    'ਮੈਂ': 'میں', 'ਅਤੇ': 'اور', 'ਹੈ': 'ہے', 'ਸੀ': 'تھا', 'ਵਿੱਚ': 'وچ', 'ਹਨ': 'ہیں', 'ਨੂੰ': 'نوں', 'ਦਾ': 'دا', 'ਦੀ': 'دی', 'ਦੇ': 'دے', 'ਘਰ': 'گھر', 'ਨਾਮ': 'نان', 'ਪਾਣੀ': 'پانی', 'ਰੋਟੀ': 'روٹی', 'ਧੰਨਵਾਦ': 'شکریہ', 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ': 'سلام',
    'ਸਦ੍ਹਾਰ': 'سدھار', 'ਸਿੱਖਾਂ': 'سکھاں', 'ਅੰਦਰ': 'اندر', 'ਜੋਸ਼': 'جوش', 'ਜਗਾਇਆ': 'جگایا', 'ਜ਼ਲਜ਼ਲਾ': 'زلزلہ', 'ਆਇਆ': 'آیا', 'ਨਆਰੇ': 'نعرے', 'ਵਜੇ': 'وجے', 'ਨਹੀਂ': 'نہیں', 'ਮਾਂ': 'ماں', 'ਜਾਈ': 'جائی', 'ਹਮਸਾਈ': 'ہمسائی', 'ਵੈਰੀ': 'ویری', 'ਖੁਸ਼ੀਆਂ': 'خوشیاں', 'ਕਰਦੇ': 'کردے', 'ਦੱਸ': 'دس', 'ਚੰਗੇ': 'چنگے', 'ਲੱਗਦੇ': 'لگدے', 'ਹੱਸਦੇ': 'ہسدے', 'ਬੱਸਦੇ': 'بستے', 'ਪੱਥਰ': 'پتھر', 'ਦੁਆਵਾਂ': 'دعاواں', 'ਬਾਰਿਸ਼': 'بارش', 'ਸਮੁੰਦਰ': 'سمندر', 'ਹਾਸੇ': 'ہاسے', 'ਖੋਹ': 'کھوہ', 'ਅੱਥਰੂ': 'اتھر', 'ਅੱਖਾਂ': 'اکھاں', 'ਪੁੱਤਰ': 'پتر', 'ਰੁੱਖਾਂ': 'رکھاں', 'ਮੰਜ਼ਰ': 'منظر', 'ਸੁੰਝ': 'سنج', 'ਮਸੰਜਾ': 'مسنجا', 'ਅੱਖਰ': 'اکھر', 'ਰਲ': 'رال', 'ਖੇਡਦੇ': 'کھیڈدے', 'ਜੇਕਰ': 'جیکر', 'ਵੀਰਾ': 'ویرا', 'ਹੁੰਦਾ': 'ہوندا', 'ਬੁਲ੍ਹੇ': 'بلھے'
};

/**
 * Natural Urdu Semantic Layer: Refines Punjabi terms into fluent, natural Urdu.
 */
const naturalUrdu: Record<string, string> = {
    // Basic Grammar & Connectives
    'تے': 'پر', 'دے': 'کے', 'دی': 'کی', 'دا': 'کا', 'وچ': 'میں', 'نوں': 'کو', 'توں': 'سے', 'آں': 'ہوں/ہیں', 'نیں': 'ہیں', 'سی': 'تھا/تھی', 'سن': 'تھے/تھیں', 'ایہ': 'یہ', 'اوہ': 'وہ', 'کجھ': 'کچھ', 'جد': 'جب', 'تد': 'تب', 'کد': 'کب', 'وی': 'بھی', 'نال': 'ساتھ', 'کیتے': 'کیے', 'ہوئے': 'ہوئے', 'گئے': 'گئے', 'ریا': 'رہا', 'رئی': 'رہی', 'رئے': 'رہے',
    // Poetic & Core Meanings
    'سدھار': 'اصلاح', 'مکائے': 'ختم کیے', 'سکھاں': 'سکھوں', 'اندر': 'اندر/میں', 'جوش': 'جذبہ/جوش', 'جگایا': 'بیدار کیا', 'زلزلا': 'زلزلہ', 'آیا': 'آیا', 'وجے': 'گونجے', 'نہیں': 'نہیں', 'ماں': 'ماں', 'جائی': 'اولاد/جنی', 'ہمسائی': 'پڑوسی', 'ویری': 'دشمن', 'خوشیاں': 'خوشیاں', 'کردے': 'کرتے', 'دس': 'بتاؤ', 'چنگے': 'اچھے', 'لگدے': 'لگتے', 'ہسدے': 'ہنستے', 'بستے': 'بستے', 'گھر': 'گھر', 'پتھر': 'پتھر', 'دعاواں': 'دعائیں', 'بارش': 'بارش', 'سمندر': 'سمندر', 'ہاسے': 'ہنسی/قہقہے', 'کھوہ': 'چھین', 'اتھر': 'آنسو', 'اکھاں': 'آنکھوں', 'پتر': 'بیٹا/پتا', 'رکھاں': 'درختوں', 'منظر': 'منظر', 'سنج': 'ویران', 'مسنجا': 'اکیلا', 'اکھر': 'حروف/لفظ', 'رال': 'مل/اکٹھے', 'کھیڈدے': 'کھیلتے', 'جیکر': 'اگر', 'ویرا': 'بھائی', 'ہوندا': 'ہوتا', 'بلھے': 'بلھے', 'شاہ': 'شاہ', 'نعرے': 'نعرے', 'رانگڑ': 'رانگڑ', 'پانڈو': 'پانڈو', 'تیری': 'تمہاری/تیری', 'جے': 'اگر', 'تیرا': 'تمہارا', 'میرا': 'میرا', 'ہونا': 'ہونا', 'کرنا': 'کرنا', 'جانا': 'جانا', 'ایدا': 'اس کا', 'اودا': 'اس کا', 'ایتھے': 'یہاں', 'اوتھے': 'وہاں', 'کیویں': 'کیسے', 'کیوں': 'کیوں', 'ہک': 'ایک'
};

/**
 * Simple English Semantic Layer: Provides clear, modern English meanings.
 */
const simpleEnglish: Record<string, string> = {
    // Grammar & Particles
    'تے': 'on', 'دے': 'of', 'دی': 'of', 'دا': 'of', 'وچ': 'in', 'نوں': 'to', 'توں': 'from', 'آں': 'am/are', 'نیں': 'are', 'سی': 'was', 'سن': 'were', 'ایہ': 'this', 'اوہ': 'that', 'کجھ': 'some', 'جد': 'when', 'وی': 'also', 'نال': 'with',
    // High-Quality Meanings
    'سدھار': 'reform', 'مکائے': 'finished', 'سکھاں': 'Sikhs', 'اندر': 'inside', 'جوش': 'passion/fervor', 'جگایا': 'awakened', 'زلزلا': 'earthquake', 'آیا': 'came', 'نعرے': 'slogans', 'وجے': 'echoed', 'نہیں': 'not', 'ماں': 'mother', 'جائی': 'born/offspring', 'تیری': 'your', 'ہمسائی': 'neighbor', 'ویری': 'enemies', 'خوشیاں': 'happiness', 'کردے': 'doing', 'دس': 'tell', 'چنگے': 'good', 'لگدے': 'look/seem', 'ہسدے': 'laughing', 'بستے': 'living', 'گھر': 'home', 'پتھر': 'stones', 'دعاواں': 'prayers', 'بارش': 'rain', 'سمندر': 'ocean', 'ہاسے': 'laughter', 'کھوہ': 'snatch/take', 'اتھر': 'tears', 'اکھاں': 'eyes', 'پتر': 'son/leaves', 'رکھاں': 'trees', 'منظر': 'scene', 'سنج': 'desolate', 'مسنجا': 'lonely', 'اکھر': 'words', 'رال': 'together', 'کھیڈدے': 'playing', 'جیکر': 'if', 'ویرا': 'brother', 'ہوندا': 'would be', 'بلھے': 'Bulleh', 'شاہ': 'Shah', 'نعرے': 'shouts', 'رانگڑ': 'Rangr', 'پانڈو': 'Pando', 'جے': 'if', 'وڈا': 'big', 'سوہنا': 'beautiful', 'نکا': 'small', 'بھرا': 'brother', 'پین': 'sister', 'دھی': 'daughter', 'پیو': 'father', 'پانی': 'water', 'روٹی': 'bread', 'کم': 'work', 'نام': 'name'
};

/**
 * Normalization function to strip diacritics, honorifics, and simplify scripts.
 */
function normalize(text: string): string {
    return text
        .replace(/[\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g, "") // Urdu diacritics
        .replace(/[ؒؓؔؕؐؑؐ]/g, "") // Honorific symbols
        .replace(/[\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B\u0A4C\u0A4D\u0A70\u0A71\u0A75]/g, "") // Gurmukhi diacritics
        .trim();
}

/**
 * Phonetic fallback when a semantic meaning isn't found.
 */
function phonetically(text: string, script: 'gurmukhi' | 'shahmukhi'): string {
    let res = '';
    const map = script === 'gurmukhi' ? gurmukhiMap : shahmukhiMap;
    for (const char of Array.from(text)) res += map[char] || char;
    return res.replace(/aa/g, 'a').replace(/ii/g, 'ee').replace(/uu/g, 'oo');
}

export function translateLocal(text: string, targetLanguage: string): { translation: string; detectedLanguage: string } {
    const isGurmukhi = /[\u0A00-\u0A7F]/.test(text);
    const isShahmukhi = /[\u0600-\u06FF]/.test(text);
    let masterScript: 'gurmukhi' | 'shahmukhi' | 'english' = 'english';

    if (isGurmukhi) masterScript = 'gurmukhi';
    else if (isShahmukhi) masterScript = 'shahmukhi';

    if (masterScript === 'english') {
        return { translation: text, detectedLanguage: 'english' };
    }

    const lines = text.split('\n');
    const translatedLines = lines.map(line => {
        // Split by words, preserving whitespace and punctuation
        const tokens = line.split(/(\s+|[،۔؟!.,])/);

        return tokens.map(token => {
            const trimmed = token.trim();
            // Skip non-Punjabi tokens
            if (!trimmed || !/[\u0600-\u06FF\u0A00-\u0A7F]/.test(trimmed)) return token;

            const normalized = normalize(trimmed);

            // 1. Script Bridging (Gurmukhi -> Shahmukhi semantic key)
            let bridgeKey = trimmed;
            if (masterScript === 'gurmukhi') {
                bridgeKey = scriptBridge[trimmed] || scriptBridge[normalized] || trimmed;
                // If it's still Gurmukhi, normalize it for bridge check
                if (/[\u0A00-\u0A7F]/.test(bridgeKey)) {
                    const normGurmukhi = normalize(bridgeKey);
                    bridgeKey = scriptBridge[normGurmukhi] || bridgeKey;
                }
            }

            const dictionary = targetLanguage === 'urdu' ? naturalUrdu : simpleEnglish;

            // 2. High-Precision Semantic Lookup
            const normalizedBridge = normalize(bridgeKey);
            let result = dictionary[bridgeKey] || dictionary[normalizedBridge];

            // 3. Intelligent Stemming (Handle plurality and case endings)
            if (!result && masterScript === 'shahmukhi') {
                const stems = [normalizedBridge.replace(/اں$/, ""), normalizedBridge.replace(/یاں$/, ""), normalizedBridge.replace(/ے$/, "")];
                for (const stem of stems) {
                    if (dictionary[stem]) {
                        result = dictionary[stem];
                        break;
                    }
                }
            }

            // 4. Phonetic Fallback
            return result || phonetically(trimmed, masterScript as 'gurmukhi' | 'shahmukhi');
        }).join('');
    });

    return {
        translation: translatedLines.join('\n').trim(),
        detectedLanguage: `punjabi-${masterScript}`
    };
}
