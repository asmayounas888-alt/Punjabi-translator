// Universal Punjabi Transliteration Engine v2.0
// Supports: Gurmukhi, Shahmukhi -> English, Urdu

const gurmukhiMap: Record<string, string> = {
    'ੳ': 'u', 'ਅ': 'a', 'ੲ': 'i', 'ਸ': 's', 'ਹ': 'h', 'ਕ': 'k', 'ਖ': 'kh', 'ਗ': 'g', 'ਘ': 'gh', 'ਙ': 'ng', 'ਚ': 'ch', 'ਛ': 'chh', 'ਜ': 'j', 'ਝ': 'jh', 'ਞ': 'ny', 'ਟ': 't', 'ਠ': 'th', 'ਡ': 'd', 'ਢ': 'dh', 'ਣ': 'n', 'ਤ': 't', 'ਥ': 'th', 'ਦ': 'd', 'ਧ': 'dh', 'ਨ': 'n', 'ਪ': 'p', 'ਫ': 'ph', 'ਬ': 'b', 'ਭ': 'bh', 'ਮ': 'm', 'ਯ': 'y', 'ਰ': 'r', 'ਲ': 'l', 'ਵ': 'v', 'ੜ': 'r', 'ਸ਼': 'sh', 'ਖ਼': 'kh', 'ਗ਼': 'gh', 'ਜ਼': 'z', 'ਫ਼': 'f', 'ਾ': 'a', 'ਿ': 'i', 'ੀ': 'ee', 'ੁ': 'u', 'ੂ': 'oo', 'ੇ': 'e', 'ੈ': 'ai', 'ੋ': 'o', 'ੌ': 'au', 'ੰ': 'n', 'ੱ': '', '।': '.', '॥': '.'
};

const shahmukhiMap: Record<string, string> = {
    'ا': 'a', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't', 'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd', 'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh', 'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g', 'ل': 'l', 'م': 'm', 'ن': 'n', 'ں': 'n', 'و': 'o', 'ہ': 'h', 'ھ': 'h', 'ی': 'i', 'ے': 'e', 'آ': 'aa', 'ؤ': 'o', 'ئ': 'e'
};

const universalUrduBridge: Record<string, string> = {
    // Gurmukhi to Urdu mappings
    'ੳ': 'او', 'ਅ': 'ا', 'ੲ': 'ای', 'ਸ': 'س', 'ਹ': 'ہ', 'ਕ': 'ک', 'ਖ': 'کھ', 'ਗ': 'گ', 'ਘ': 'گھ', 'ਚ': 'چ', 'ਛ': 'چھ', 'ਜ': 'ج', 'ਝ': 'جھ', 'ਟ': 'ٹ', 'ਠ': 'ٹھ', 'ਡ': 'ڈ', 'ਢ': 'ڈھ', 'ਣ': 'ن', 'ਤ': 'ت', 'ਥ': 'تھ', 'ਦ': 'د', 'ਧ': 'دھ', 'ਨ': 'ن', 'ਪ': 'پ', 'ਫ': 'پھ', 'ਬ': 'ب', 'ਭ': 'بھ', 'ਮ': 'م', 'ਰ': 'ر', 'ਲ': 'ل', 'ਵ': 'و', 'ੜ': 'ڑ', 'ਾ': 'ا', 'ੇ': 'ے', 'ੀ': 'ی', 'ੂ': 'و'
};

const particleDictionary: Record<string, { english: string; urdu: string }> = {
    // Gurmukhi Particles
    'ਮੈਂ': { english: 'I', urdu: 'میں' }, 'ਅਤੇ': { english: 'and', urdu: 'اور' }, 'ਹੈ': { english: 'is', urdu: 'ہے' }, 'ਸੀ': { english: 'was', urdu: 'تھا' }, 'ਵਿੱਚ': { english: 'in', urdu: 'میں' }, 'ਹਨ': { english: 'are', urdu: 'ہیں' }, 'ਨੂੰ': { english: 'to', urdu: 'کو' }, 'ਦਾ': { english: 'of', urdu: 'کا' }, 'ਦੀ': { english: 'of', urdu: 'کی' }, 'ਦੇ': { english: 'of', urdu: 'کے' },
    // Shahmukhi Particles
    'وچ': { english: 'in', urdu: 'میں' }, 'تے': { english: 'on', urdu: 'پر' }, 'نوں': { english: 'to', urdu: 'کو' }, 'اے': { english: 'is', urdu: 'ہے' }, 'نیں': { english: 'are', urdu: 'ہیں' }, 'آں': { english: 'am/are', urdu: 'ہوں/ہیں' }, 'ساڈے': { english: 'our', urdu: 'ہمارے' }, 'توں': { english: 'from', urdu: 'سے' }, 'دی': { english: 'of', urdu: 'کی' }, 'دا': { english: 'of', urdu: 'کا' }, 'دے': { english: 'of', urdu: 'کے' }
};

function detectScript(text: string): 'gurmukhi' | 'shahmukhi' | 'english' {
    if (/[\u0A00-\u0A7F]/.test(text)) return 'gurmukhi';
    if (/[\u0600-\u06FF]/.test(text)) return 'shahmukhi';
    return 'english';
}

export function translateLocal(text: string, targetLanguage: string): { translation: string; detectedLanguage: string } {
    const script = detectScript(text);
    const words = text.split(/(\s+)/);

    const result = words.map(word => {
        const trimmed = word.trim();
        if (!trimmed) return word;

        // 1. Check Global Particle Dictionary
        if (particleDictionary[trimmed]) {
            return targetLanguage === 'english' ? particleDictionary[trimmed].english : particleDictionary[trimmed].urdu;
        }

        // 2. Perform Script Mapping
        let transformed = '';
        if (script === 'gurmukhi') {
            if (targetLanguage === 'urdu') {
                for (const char of Array.from(trimmed)) transformed += universalUrduBridge[char] || char;
            } else {
                for (const char of Array.from(trimmed)) transformed += gurmukhiMap[char] || char;
            }
        } else if (script === 'shahmukhi') {
            if (targetLanguage === 'urdu') {
                return word; // Already in shared script, particles handled above
            } else {
                for (const char of Array.from(trimmed)) transformed += shahmukhiMap[char] || char;
            }
        } else {
            return word;
        }

        return transformed || word;
    });

    return {
        translation: result.join('').replace(/aa/g, 'a').replace(/ii/g, 'ee'),
        detectedLanguage: `punjabi-${script}`
    };
}
