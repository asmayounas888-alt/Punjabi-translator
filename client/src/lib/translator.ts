// Universal Punjabi Semantic Translation Engine v10.0 - "The Proper Bridge"
// Focus: Proper Sentences + Natural Grammar + Deep Linguistic Rules

// Comprehensive mappings for naturalizing Punjabi into Urdu and English
const particles: Record<string, { urdu: string, eng: string }> = {
    'دا': { urdu: 'کا', eng: 'of/his' },
    'دی': { urdu: 'کی', eng: 'of/her' },
    'دے': { urdu: 'کے', eng: 'of/their' },
    'نوں': { urdu: 'کو', eng: 'to' },
    'تے': { urdu: 'پر', eng: 'on/but' },
    'وچ': { urdu: 'میں', eng: 'in' },
    'ਤੋਂ': { urdu: 'سے', eng: 'from' },
    'توں': { urdu: 'سے', eng: 'from' },
    'نال': { urdu: 'ساتھ', eng: 'with' },
    'وی': { urdu: 'بھی', eng: 'also' },
    'ایہ': { urdu: 'یہ', eng: 'this' },
    'اوہ': { urdu: 'وہ', eng: 'that' },
    'آں': { urdu: 'ہوں/ہیں', eng: 'am/are' },
    'نیں': { urdu: 'ہیں', eng: 'are' },
    'سی': { urdu: 'تھا/تھی', eng: 'was' },
    'سن': { urdu: 'تھے/تھیں', eng: 'were' },
    'جے': { urdu: 'اگر', eng: 'if' },
    'کجھ': { urdu: 'کچھ', eng: 'some' },
    'جد': { urdu: 'جب', eng: 'when' },
    'تد': { urdu: 'تب', eng: 'then' },
    'کد': { urdu: 'کب', eng: 'when' },
    'ہک': { urdu: 'ایک', eng: 'one' }
};

const commonVerbs: Record<string, { urdu: string, eng: string }> = {
    'کردے': { urdu: 'کرتے', eng: 'doing' },
    'ہوندے': { urdu: 'ہوتے', eng: 'happening' },
    'لگدے': { urdu: 'لگتے/محسوس ہوتے', eng: 'seem/feel' },
    'آیا': { urdu: 'آیا', eng: 'came' },
    'گیا': { urdu: 'گیا', eng: 'gone' },
    'مکائے': { urdu: 'ختم کیے', eng: 'finished/ended' },
    'جگایا': { urdu: 'بیدار کیا', eng: 'awakened' },
    'ہسدے': { urdu: 'ہنستے', eng: 'laughing' },
    'بستے': { urdu: 'بستے', eng: 'living' },
    'کھیڈدے': { urdu: 'کھیلتے', eng: 'playing' },
    'آونا': { urdu: 'آنا', eng: 'to come' },
    'جاونا': { urdu: 'جانا', eng: 'to go' },
    'دسنا': { urdu: 'بتانا', eng: 'to tell' }
};

const commonNouns: Record<string, { urdu: string, eng: string }> = {
    'سکھاں': { urdu: 'سکھوں', eng: 'Sikhs' },
    'اندر': { urdu: 'کے اندر', eng: 'inside' },
    'جوش': { urdu: 'جذبہ', eng: 'passion' },
    'سدھار': { urdu: 'اصلاح', eng: 'reform' },
    'زلزلا': { urdu: 'زلزلہ', eng: 'earthquake' },
    'ماں': { urdu: 'ماں', eng: 'mother' },
    'جائی': { urdu: 'اولاد', eng: 'offspring' },
    'ویری': { urdu: 'دشمن', eng: 'enemies' },
    'خوشیاں': { urdu: 'خوشیاں', eng: 'happiness' },
    'گھر': { urdu: 'گھر', eng: 'home' },
    'پتھر': { urdu: 'پتھر', eng: 'stones' },
    'دعاواں': { urdu: 'دعائیں', eng: 'prayers' },
    'منظر': { urdu: 'منظر', eng: 'scene' },
    'اکھر': { urdu: 'حروف', eng: 'words' },
    'ویرا': { urdu: 'بھائی', eng: 'brother' },
    'پانی': { urdu: 'پانی', eng: 'water' },
    'نام': { urdu: 'نام', eng: 'name' }
};

const scriptBridge: Record<string, string> = {
    'ਮੈਂ': 'میں', 'ਅਤੇ': 'اور', 'ਹੈ': 'ہے', 'ਸੀ': 'تھا', 'ਵਿੱਚ': 'وچ', 'ਹਨ': 'ہیں', 'ਨੂੰ': 'نوں', 'ਦਾ': 'دا', 'ਦੀ': 'دی', 'ਦੇ': 'دے', 'ਘਰ': 'گھر', 'ਨਾਮ': 'نان',
    'ਸਿੱਖਾਂ': 'سکھاں', 'ਅੰਦਰ': 'اندر', 'ਜਗਾਇਆ': 'جگایا', 'ਚੰਗੇ': 'چنگے', 'ਲੱਗਦੇ': 'لگدے'
};

function normalize(text: string): string {
    return text
        .replace(/[\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g, "")
        .replace(/[ؒؓؔؕؐؑؐ]/g, "")
        .replace(/[\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B\u0A4C\u0A4D\u0A70\u0A71\u0A75]/g, "")
        .trim();
}

export function translateLocal(text: string, targetLanguage: string): { translation: string; detectedLanguage: string } {
    const isGurmukhi = /[\u0A00-\u0A7F]/.test(text);
    const script = isGurmukhi ? 'gurmukhi' : 'shahmukhi';

    const lines = text.split('\n');
    const translatedLines = lines.map(line => {
        const tokens = line.split(/(\s+|[،۔؟!.,])/);

        return tokens.map(token => {
            let part = token.trim();
            if (!part || !/[\u0600-\u06FF\u0A00-\u0A7F]/.test(part)) return token;

            // Bridge Gurmukhi to Shahmukhi base
            if (isGurmukhi) {
                part = scriptBridge[part] || scriptBridge[normalize(part)] || part;
            }

            const clean = normalize(part);
            const lang = targetLanguage === 'urdu' ? 'urdu' : 'eng';

            // 1. Check Particles (Grammar)
            if (particles[clean]) return particles[clean][lang];

            // 2. Check Verbs
            if (commonVerbs[clean]) return commonVerbs[clean][lang];

            // 3. Check Nouns
            if (commonNouns[clean]) return commonNouns[clean][lang];

            // 4. Intelligent Suffix Stemming
            // Handle plurals (aan -> empty)
            const stems = [
                clean.replace(/اں$/, ""),
                clean.replace(/وں$/, ""),
                clean.replace(/یاں$/, ""),
                clean.replace(/ے$/, "")
            ];

            for (const stem of stems) {
                if (commonNouns[stem]) return commonNouns[stem][lang];
                if (commonVerbs[stem]) return commonVerbs[stem][lang];
            }

            // 5. Final Fallback (Proper nouns or missing words)
            return part; // Return as is for names/proper nouns instead of weird phonetics
        }).join('');
    });

    return {
        translation: translatedLines.join('\n').trim(),
        detectedLanguage: `punjabi-${script}`
    };
}
