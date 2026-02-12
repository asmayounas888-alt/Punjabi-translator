const shahmukhiToEnglishMap: Record<string, string> = {
    'ا': 'a', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't', 'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd', 'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r', 'ز': 'z', 'ژ': 'zh', 'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g', 'ل': 'l', 'م': 'm', 'ن': 'n', 'ں': 'n', 'و': 'o', 'ہ': 'h', 'ھ': 'h', 'ی': 'i', 'ے': 'e', 'آ': 'aa', 'ؤ': 'o', 'ئ': 'e'
};

const punjabiToEnglishMap: Record<string, string> = {
    'ੳ': 'u', 'ਅ': 'a', 'ੲ': 'i', 'ਸ': 's', 'ਹ': 'h', 'ਕ': 'k', 'ਖ': 'kh', 'ਗ': 'g', 'ਘ': 'gh', 'ਙ': 'ng', 'ਚ': 'ch', 'ਛ': 'chh', 'ਜ': 'j', 'ਝ': 'jh', 'ਞ': 'ny', 'ਟ': 't', 'ਠ': 'th', 'ਡ': 'd', 'ਢ': 'dh', 'ਣ': 'n', 'ਤ': 't', 'ਥ': 'th', 'ਦ': 'd', 'ਧ': 'dh', 'ਨ': 'n', 'ਪ': 'p', 'ਫ': 'ph', 'ਬ': 'b', 'ਭ': 'bh', 'ਮ': 'm', 'ਯ': 'y', 'ਰ': 'r', 'ਲ': 'l', 'ਵ': 'v', 'ੜ': 'r', 'ਸ਼': 'sh', 'ਖ਼': 'kh', 'ਗ਼': 'gh', 'ਜ਼': 'z', 'ਫ਼': 'f', 'ਾ': 'a', 'ਿ': 'i', 'ੀ': 'ee', 'ੁ': 'u', 'ੂ': 'oo', 'ੇ': 'e', 'ੈ': 'ai', 'ੋ': 'o', 'ੌ': 'au', 'ੰ': 'n'
};

const punjabiToUrduMap: Record<string, string> = {
    'ੳ': 'او', 'ਅ': 'ا', 'ੲ': 'ای', 'ਸ': 'س', 'ਹ': 'ہ', 'ਕ': 'ک', 'ਖ': 'کھ', 'ਗ': 'گ', 'ਘ': 'گھ', 'ਙ': 'ں', 'ਚ': 'چ', 'ਛ': 'چھ', 'ਜ': 'ج', 'ਝ': 'جھ', 'ਞ': 'ن', 'ਟ': 'ٹ', 'ਠ': 'ٹھ', 'ਡ': 'ڈ', 'ਢ': 'ڈھ', 'ਣ': 'ن', 'ਤ': 'ت', 'ਥ': 'تھ', 'ਦ': 'د', 'ਧ': 'دھ', 'ਨ': 'ن', 'ਪ': 'پ', 'ਫ': 'پھ', 'ਬ': 'ب', 'ਭ': 'بھ', 'ਮ': 'م', 'ਯ': 'ی', 'ਰ': 'ر', 'ਲ': 'ل', 'ਵ': 'و', 'ੜ': 'ڑ', 'ਸ਼': 'ش', 'ਖ਼': 'خ', 'ਗ਼': 'غ', 'ਜ਼': 'z', 'ਫ਼': 'ف'
};

// High-Fidelity Poetic Mappings (Multi-word Phrases First)
const shahmukhiPhrasesUrdu: Record<string, string> = {
    'سُنج مسنجا': 'ویران اور تنہا',
    'منظر بن کے رہنے آں': 'منظر بن کر رہتے ہیں',
    'ہسدے گھر وچ': 'ہنستے بستے گھر میں',
    'پتھر بن کے رہنے آں': 'پتھروں کی طرح رہتے ہیں',
    'ساڈے ہتھوں': 'ہمارے ہاتھوں سے',
    'سبھ دُعاواں': 'تمام دعائیں',
    'ڈِگ پئیاں': 'گر گئیں',
    'کالی جِبھ دے': 'کالی زبان کے',
    'یاد رہوے': 'یاد رکھو',
    'دھرتی وچ': 'زمین پر',
    'سمندر بن کے رہنے آں': 'سمندر کی طرح رہتے ہیں',
    'ہاسے کھَوہ کے': 'ہنسی چھین کر',
    'مار مُکانا': 'مار مکانا',
    'سوکھا نہیں': 'آسان نہیں',
    'اَکھاں دے وچ': 'آنکھوں میں',
    'ساڈے پتر جھاڑ کے': 'ہمارے بیٹوں کو جھاڑ کر',
    'خُش پئے ہوندے او': 'خوش ہوتے ہو',
    'اسیں تے': 'ہم تو',
    'رُکھاں اندر': 'درختوں میں',
    'کجھ رِچھاں نے': 'کچھ ریچھوں نے',
    'جد دے': 'جب سے',
    'جنگل چھڈے نیں': 'جنگل چھوڑ چکے ہیں',
    'اسیں وی': 'ہم بھی',
    'شاؔد قلندر بن کے رہنے آں': 'شاہد قلندر بن کر جیتے ہیں',
    'لھا ؒ دس ایہ چنگے لگدے': 'مجھے بتائیں، کیا وہ اچھے لگتے ہیں؟',
    'شاہ درویش دے گھر میں جمدی': 'شاہ درویش کے گھر پیدا ہوئے',
    'رَل کے کھیڈدے میں تے بُلھا ؒ': 'بُلھا اور میں اکٹھے کھیلا کرتے تھے',
    'جیکر ہوندا وِیرا میرا': 'اگر یہ میرا بھائی ہوتا'
};

const shahmukhiPhrasesEnglish: Record<string, string> = {
    'سُنج مسنجا': 'Desolate and lonely',
    'منظر بن کے رہنے آں': 'living as a scene',
    'ہسدے گھر وچ': 'in a happy home',
    'پتھر بن کے رہنے آں': 'living like stones',
    'ساڈے ہتھوں': 'from our hands',
    'سبھ دُعاواں': 'all prayers',
    'ڈِگ پئیاں': 'fell down',
    'کالی جِبھ دے': 'of the black tongue',
    'اکھر بن کے رہنے آں': 'living as words',
    'یاد رہوے': 'remember this',
    'دھرتی وچ': 'in the earth',
    'سمندر بن کے رہنے آں': 'living as an ocean',
    'ہاسے کھَوہ کے': 'by snatching laughter',
    'مار مُکانا': 'to finish off',
    'سوکھا نہیں': 'is not easy',
    'اَکھاں دے وچ': 'in the eyes',
    'اتھر بن کے رہنے آں': 'living as tears',
    'ساڈے پتر جھاڑ کے': 'by shaking our leaves/sons',
    'خُش پئے ہوندے او': 'you feel happy',
    'اسیں تے': 'and we',
    'رُکھاں اندر': 'inside the trees',
    'کجھ رِچھاں نے': 'some bears',
    'جنگل چھڈے نیں': 'have left the forest',
    'شاؔد قلندر بن کے رہنے آں': 'live as a happy Qalandar',
    'لھا ؒ دس ایہ چنگے لگدے': 'tell me, do these look good?',
    'شاہ درویش دے گھر میں جمدی': 'born in the house of Shah Dervish',
    'رَل کے کھیڈدے میں تے بُلھا ؒ': 'Bulla and I played together',
    'جیکر ہوندا وِیرا میرا': 'if he were my brother'
};

const contextualUrdu: Record<string, string> = {
    'وچ': 'میں', 'ساڈے': 'ہمارے', 'ساڈی': 'ہماری', 'ساڈا': 'ہمارا', 'آں': 'ہیں',
    'نیں': 'ہیں', 'تے': 'پر', 'دے': 'کے', 'دی': 'کی', 'دا': 'کا', 'توں': 'سے',
    'اکھر': 'حروف', 'اتھر': 'آنسو', 'رُکھ': 'درخت', 'رَل': 'مل', 'ہوندا': 'ہوتا'
};

function detectLanguage(text: string): string {
    if (/[\u0A00-\u0A7F]/.test(text)) return 'punjabi-gurmukhi';
    if (/[\u0600-\u06FF]/.test(text)) return 'punjabi-shahmukhi';
    return /[a-zA-Z]/.test(text) ? 'english' : 'unknown';
}

function phonetically(text: string): string {
    let res = '';
    for (const char of Array.from(text)) res += shahmukhiToEnglishMap[char] || char;
    return res.replace(/aa/g, 'a').replace(/ii/g, 'ee');
}

export function translateLocal(text: string, targetLanguage: string): { translation: string; detectedLanguage: string } {
    const detectedLanguage = detectLanguage(text);
    let result = text;

    if (detectedLanguage === 'punjabi-shahmukhi') {
        const dictionary = targetLanguage === 'urdu' ? shahmukhiPhrasesUrdu : shahmukhiPhrasesEnglish;

        // Priority 1: Multi-word phrases
        for (const [phrase, replacement] of Object.entries(dictionary)) {
            const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            result = result.replace(regex, replacement);
        }

        // Priority 2: Single words for Urdu refine
        if (targetLanguage === 'urdu') {
            const words = result.split(/(\s+)/);
            result = words.map(word => contextualUrdu[word.trim()] || word).join('');
        } else {
            // For English, anything not matched by phrases gets phoneticized
            const words = result.split(/(\s+)/);
            result = words.map(word => {
                const trimmed = word.trim();
                if (!trimmed || /[a-zA-Z]/.test(trimmed)) return word;
                return phonetically(trimmed);
            }).join('');
        }
    }

    return { translation: result.trim(), detectedLanguage };
}
