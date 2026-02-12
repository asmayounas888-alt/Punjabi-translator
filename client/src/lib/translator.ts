// Universal Punjabi Semantic Translation Engine v4.1
// Priority: Semantic Meaning > Contextual Logic > Phonetic Fallback

const gurmukhiMap: Record<string, string> = {
    'ੳ': 'u', 'ਅ': 'a', 'ੲ': 'i', 'ਸ': 's', 'ਹ': 'h', 'ਕ': 'k', 'ਖ': 'kh', 'ਗ': 'g', 'ਘ': 'gh', 'ਙ': 'ng', 'ਚ': 'ch', 'ਛ': 'chh', 'ਜ': 'j', 'ਝ': 'jh', 'ਞ': 'ny', 'ਟ': 't', 'ਠ': 'th', 'ਡ': 'd', 'ਢ': 'dh', 'ਣ': 'n', 'ਤ': 't', 'ਥ': 'th', 'ਦ': 'd', 'ਧ': 'dh', 'ਨ': 'n', 'ਪ': 'p', 'ਫ': 'ph', 'ਬ': 'b', 'ਭ': 'bh', 'ਮ': 'm', 'ਯ': 'y', 'ਰ': 'r', 'ਲ': 'l', 'ਵ': 'v', 'ੜ': 'r', 'ਸ਼': 'sh', 'ਖ਼': 'kh', 'ਗ਼': 'gh', 'ਜ਼': 'z', 'ਫ਼': 'f', 'ਾ': 'a', 'ਿ': 'i', 'ੀ': 'ee', 'ੁ': 'u', 'ੂ': 'oo', 'ੇ': 'e', 'ੈ': 'ai', 'ੋ': 'o', 'ੌ': 'au', 'ੰ': 'n', 'ੱ': '', '।': '.', '॥': '.'
};

const shahmukhiMap: Record<string, string> = {
    'ا': 'a', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't', 'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd', 'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh', 'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g', 'ل': 'l', 'م': 'm', 'ن': 'n', 'ں': 'n', 'و': 'o', 'ہ': 'h', 'ھ': 'h', 'ی': 'i', 'ے': 'e', 'آ': 'aa', 'ؤ': 'o', 'ئ': 'e'
};

const urduMeanings: Record<string, string> = {
    // Connectives / Particles
    'تے': 'پر',
    'دے': 'کے',
    'دی': 'کی',
    'دا': 'کا',
    'وچ': 'میں',
    'نوں': 'کو',
    'توں': 'سے',
    'آں': 'ہیں/ہوں',
    'نیں': 'ہیں',
    'سی': 'تھا',
    'سن': 'تھے',
    'ساڈا': 'ہمارا',
    'ساڈی': 'ہماری',
    'ساڈے': 'ہمارے',
    'ایس': 'اس',
    'جس': 'جس',
    'پر': 'لیکن/پر',
    'ایہ': 'یہ',
    'اوہ': 'وہ',
    'کجھ': 'کچھ',
    'جد': 'جب',
    'تد': 'تب',
    'کد': 'کب',
    'وی': 'بھی',
    'نال': 'ساتھ',
    // Nouns / Verbs / Adjectives
    'سدھار': 'اصلاح',
    'مُکائے': 'ختم کیے',
    'سکھاں': 'سکھوں',
    'اندر': 'اندر/میں',
    'جوش': 'جذبہ',
    'جگایا': 'بیدار کیا',
    'زلزلا': 'زلزلہ',
    'آیا': 'آیا',
    'وجے': 'گونجے',
    'نہیں': 'نہیں',
    'ماں': 'ماں',
    'جائی': 'اولاد/جنی',
    'ہمسائی': 'پڑوسی',
    'وَیری': 'دشمن',
    'خُشیاں': 'خوشیاں',
    'کردے': 'کرتے',
    'دس': 'بتاؤ',
    'چنگے': 'اچھے',
    'لگدے': 'لگتے',
    'ہسدے': 'ہنستے',
    'بستے': 'بستے',
    'گھر': 'گھر',
    'پتھر': 'پتھر',
    'دُعاواں': 'دعائیں',
    'بارش': 'بارش',
    'سمندر': 'سمندر',
    'ہاسے': 'ہنسی',
    'کھَوہ': 'چھین',
    'اتھر': 'آنسو',
    'اَکھاں': 'آنکھوں',
    'پتر': 'پتہ/بیٹا',
    'رُکھاں': 'درختوں',
    'منظر': 'منظر',
    'سُنج': 'ویران',
    'مسنجا': 'اکیلا',
    'اکھر': 'الفاظ',
    'رَل': 'مل',
    'کھیڈدے': 'کھیلتے',
    'جیکر': 'اگر',
    'وِیرا': 'بھائی',
    'ہوندا': 'ہوتا',
    'بلھے': 'بلھے',
    'شاہ': 'شاہ',
    'نعرے': 'نعرے',
    'رانگڑ': 'رانگڑ',
    'پانڈو': 'پانڈو'
};

const englishMeanings: Record<string, string> = {
    // Connectives / Particles
    'تے': 'on',
    'دے': 'of',
    'دی': 'of',
    'دا': 'of',
    'وچ': 'in',
    'نوں': 'to',
    'توں': 'from',
    'آں': 'am/are',
    'نیں': 'are',
    'ساڈا': 'our',
    'ساڈی': 'our',
    'ساڈے': 'our',
    'ایس': 'this',
    'جس': 'which',
    'پر': 'but/on',
    'ایہ': 'this',
    'اوہ': 'that',
    'کجھ': 'some',
    'جد': 'when',
    'وی': 'also',
    'نال': 'with',
    // Nouns / Verbs / Adjectives
    'سدھار': 'reform',
    'مُکائے': 'finished',
    'سکھاں': 'Sikhs',
    'اندر': 'inside',
    'جوش': 'passion',
    'جگایا': 'awakened',
    'زلزلا': 'earthquake',
    'آیا': 'came',
    'نعرے': 'slogans',
    'وجے': 'echoed',
    'نہیں': 'not',
    'ماں': 'mother',
    'جائی': 'born',
    'تیری': 'your',
    'ہمسائی': 'neighbor',
    'وَیری': 'enemies',
    'خُشیاں': 'happiness',
    'کردے': 'doing',
    'دس': 'tell/describe',
    'چنگے': 'good',
    'لگدے': 'look/seem',
    'ہسدے': 'laughing',
    'بستے': 'living',
    'گھر': 'house/home',
    'پتھر': 'stones',
    'دُعاواں': 'prayers',
    'بارش': 'rain',
    'سمندر': 'ocean',
    'ہاسے': 'laughter',
    'کھَوہ': 'snatching',
    'اتھر': 'tears',
    'اَکھاں': 'eyes',
    'پتر': 'son/leaves',
    'رُکھاں': 'trees',
    'منظر': 'scene',
    'سُنج': 'desolate',
    'مسنجا': 'lonely',
    'اکھر': 'words',
    'رَل': 'together',
    'کھیڈدے': 'playing',
    'جیکر': 'if',
    'وِیرا': 'brother',
    'ہوندا': 'would be',
    'بلھے': 'Bulleh',
    'شاہ': 'Shah',
    'نعرے': 'shouts',
    'حمد': 'Praise',
    'حفیظ': 'Hafeez',
    'تائب': 'Taeb'
};

const gurmukhiSemanticUrdu: Record<string, string> = {
    'ਮੈਂ': 'میں', 'ਅਤੇ': 'اور', 'ਹੈ': 'ہے', 'ਸੀ': 'تھا', 'ਵਿੱਚ': 'میں', 'ਹਨ': 'ہیں', 'ਨੂੰ': 'کو', 'ਦਾ': 'کا', 'ਦੀ': 'کی', 'ਦੇ': 'کے', 'ਘਰ': 'گھر', 'ਨਾਮ': 'نام', 'ਪਾਣੀ': 'پانی', 'ਰੋਟੀ': 'روٹی', 'ਧੰਨਵਾਦ': 'شکریہ', 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ': 'سلام/نمستے',
    'ਸਦ੍ਹਾਰ': 'اصلاح', 'ਸਿੱਖਾਂ': 'سکھوں', 'ਅੰਦਰ': 'اندر', 'ਜੋਸ਼': 'جذبہ', 'ਜਗਾਇਆ': 'بیدار کیا', 'ਜ਼ਲਜ਼ਲਾ': 'زلزلہ', 'ਆਇਆ': 'آیا', 'ਨਆਰੇ': 'نعرے', 'ਵਜੇ': 'گونجے', 'ਨਹੀਂ': 'نہیں', 'ਮਾਂ': 'ماں', 'ਜਾਈ': 'اولاد', 'ਹਮਸਾਈ': 'پڑوسی', 'ਵੈਰੀ': 'دشمن', 'ਖੁਸ਼ੀਆਂ': 'خوشیاں', 'ਕਰਦੇ': 'کرتے', 'ਦੱਸ': 'بتاؤ', 'ਚੰਗੇ': 'اچھے', 'ਲੱਗਦੇ': 'لگتے', 'ਹੱਸਦੇ': 'ہنستے', 'ਬੱਸਦੇ': 'بستے', 'ਪੱਥਰ': 'پتھر', 'ਦੁਆਵਾਂ': 'دعائیں', 'ਬਾਰਿਸ਼': 'بارش', 'ਸਮੁੰਦਰ': 'سمندر', 'ਹਾਸے': 'ہنسی', 'ਖੋਹ': 'چھین', 'ਅੱਥਰੂ': 'آنسو', 'ਅੱਖਾਂ': 'آنکھوں', 'ਪੁੱਤਰ': 'بیٹا', 'ਰੁੱਖਾਂ': 'درختوں', 'ਮੰਜ਼ਰ': 'منظر', 'ਸੁੰਝ': 'ویران', 'ਮਸੰਜਾ': 'اکیلا', 'ਅੱਖਰ': 'الفاظ', 'ਰਲ': 'مل', 'ਖੇਡਦੇ': 'کھیلتے', 'ਜੇکر': 'اگر', 'ਵੀਰਾ': 'بھائی', 'ਹੁੰਦਾ': 'ہوتا'
};

const gurmukhiSemanticEnglish: Record<string, string> = {
    'ਮੈਂ': 'I', 'ਅਤੇ': 'and', 'ਹੈ': 'is', 'ਸੀ': 'was', 'ਵਿੱਚ': 'in', 'ਹਨ': 'are', 'ਨੂੰ': 'to', 'ਦਾ': 'of', 'ਦੀ': 'of', 'ਦੇ': 'of', 'ਘਰ': 'home', 'ਨਾਮ': 'name', 'ਪਾਣੀ': 'water', 'ਰੋਟੀ': 'bread', 'ਧੰਨਵਾਦ': 'thank you', 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ': 'hello',
    'ਸਦ੍ਹਾਰ': 'reform', 'ਸਿੱਖਾਂ': 'Sikhs', 'ਅੰਦਰ': 'inside', 'ਜੋਸ਼': 'passion', 'ਜਗਾਇਆ': 'awakened', 'ਜ਼ਲਜ਼ਲਾ': 'earthquake', 'ਆਇਆ': 'came', 'ਨਆਰੇ': 'slogans', 'ਵਜੇ': 'echoed', 'ਨਹੀਂ': 'not', 'ਮਾਂ': 'mother', 'ਜਾਈ': 'born', 'ਹਮਸਾਈ': 'neighbor', 'ਵੈਰੀ': 'enemies', 'ਖੁਸ਼ੀਆਂ': 'happiness', 'ਕਰਦੇ': 'doing', 'ਦੱਸ': 'tell', 'ਚੰਗੇ': 'good', 'ਲੱਗਦੇ': 'look', 'ਹੱਸਦੇ': 'laughing', 'ਬੱਸਦੇ': 'living', 'ਪੱਥਰ': 'stones', 'ਦੁਆਵਾਂ': 'prayers', 'ਬਾਰਿਸ਼': 'rain', 'ਸਮੁੰਦਰ': 'ocean', 'ਹਾਸے': 'laughter', 'ਖੋਹ': 'snatching', 'ਅੱਥਰੂ': 'tears', 'ਅੱਖਾਂ': 'eyes', 'ਪੁੱਤਰ': 'son', 'ਰੁੱਖਾਂ': 'trees', 'ਮੰਜ਼ਰ': 'scene', 'ਸੁੰਝ': 'desolate', 'ਮਸੰਜਾ': 'lonely', 'ਅੱਖਰ': 'words', 'ਰਲ': 'together', 'ਖੇਡਦੇ': 'playing', 'ਜੇਕਰ': 'if', 'ਵੀਰਾ': 'brother', 'ਹੁੰਦਾ': 'would be'
};

function phonetically(text: string, script: 'gurmukhi' | 'shahmukhi'): string {
    let res = '';
    const charMap = script === 'gurmukhi' ? gurmukhiMap : shahmukhiMap;
    for (const char of Array.from(text)) res += charMap[char] || char;
    return res.replace(/aa/g, 'a').replace(/ii/g, 'ee').replace(/uu/g, 'oo');
}

export function translateLocal(text: string, targetLanguage: string): { translation: string; detectedLanguage: string } {
    const isGurmukhi = /[\u0A00-\u0A7F]/.test(text);
    const isShahmukhi = /[\u0600-\u06FF]/.test(text);
    const script = isGurmukhi ? 'gurmukhi' : isShahmukhi ? 'shahmukhi' : 'english';

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
                    return englishMeanings[trimmed] || phonetically(trimmed, 'shahmukhi');
                }
            } else if (script === 'gurmukhi') {
                if (targetLanguage === 'urdu') {
                    return gurmukhiSemanticUrdu[trimmed] || trimmed;
                } else {
                    return gurmukhiSemanticEnglish[trimmed] || phonetically(trimmed, 'gurmukhi');
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
