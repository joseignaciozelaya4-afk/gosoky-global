export type LanguageCode = 'es' | 'en' | 'pt' | 'fr' | 'de' | 'it' | 'zh' | 'ja' | 'ko' | 'ar';

export type Language = {
  code: LanguageCode;
  label: string;
  flag: string;
};

export const LANGUAGES: Language[] = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
];

export function getLanguageLabel(code: LanguageCode): string {
  return LANGUAGES.find((lang) => lang.code === code)?.label ?? code;
}

export function getLanguageFlag(code: LanguageCode): string {
  return LANGUAGES.find((lang) => lang.code === code)?.flag ?? '🌐';
}

type TranslationResult = {
  translatedText: string;
  detectedLanguage?: LanguageCode;
  available: boolean;
};

const demoDictionary: Record<string, Partial<Record<LanguageCode, string>>> = {
  'hola, ¿cómo estás?': {
    en: 'Hello, how are you?',
    pt: 'Olá, como você está?',
    fr: 'Bonjour, comment vas-tu ?',
    de: 'Hallo, wie geht es dir?',
    it: 'Ciao, come stai?',
    zh: '你好，你好吗？',
    ja: 'こんにちは、お元気ですか？',
    ko: '안녕하세요, 어떻게 지내세요?',
    ar: 'مرحبا، كيف حالك؟',
  },
  'hola': {
    en: 'Hello', pt: 'Olá', fr: 'Bonjour', de: 'Hallo', it: 'Ciao',
    zh: '你好', ja: 'こんにちは', ko: '안녕하세요', ar: 'مرحبا',
  },
  'buenos días': {
    en: 'Good morning', pt: 'Bom dia', fr: 'Bonjour', de: 'Guten Morgen', it: 'Buongiorno',
    zh: '早上好', ja: 'おはようございます', ko: '좋은 아침이에요', ar: 'صباح الخير',
  },
  'buenas noches': {
    en: 'Good night', pt: 'Boa noite', fr: 'Bonne nuit', de: 'Gute Nacht', it: 'Buonanotte',
    zh: '晚安', ja: 'おやすみなさい', ko: '안녕히 주무세요', ar: 'تصبح على خير',
  },
  'gracias': {
    en: 'Thank you', pt: 'Obrigado', fr: 'Merci', de: 'Danke', it: 'Grazie',
    zh: '谢谢', ja: 'ありがとう', ko: '감사합니다', ar: 'شكرا',
  },
  '¿cómo estás?': {
    en: 'How are you?', pt: 'Como você está?', fr: 'Comment vas-tu ?', de: 'Wie geht es dir?', it: 'Come stai?',
    zh: '你好吗？', ja: 'お元気ですか？', ko: '어떻게 지내세요?', ar: 'كيف حالك؟',
  },
  'me llamo': {
    en: 'My name is', pt: 'Meu nome é', fr: 'Je m\'appelle', de: 'Ich heiße', it: 'Mi chiamo',
    zh: '我叫', ja: '私の名前は', ko: '제 이름은', ar: 'اسمي',
  },
  'encantado de conocerte': {
    en: 'Nice to meet you', pt: 'Prazer em te conhecer', fr: 'Enchanté', de: 'Schön, dich kennenzulernen', it: 'Piacere di conoscerti',
    zh: '很高兴认识你', ja: 'はじめまして', ko: '만나서 반갑습니다', ar: 'سعدت بلقائك',
  },
  'hello, how are you?': {
    es: 'Hola, ¿cómo estás?', pt: 'Olá, como você está?', fr: 'Bonjour, comment vas-tu ?',
    de: 'Hallo, wie geht es dir?', it: 'Ciao, come stai?',
    zh: '你好，你好吗？', ja: 'こんにちは、お元気ですか？', ko: '안녕하세요, 어떻게 지내세요?', ar: 'مرحبا، كيف حالك؟',
  },
  'hello': {
    es: 'Hola', pt: 'Olá', fr: 'Bonjour', de: 'Hallo', it: 'Ciao',
    zh: '你好', ja: 'こんにちは', ko: '안녕하세요', ar: 'مرحبا',
  },
  'good morning': {
    es: 'Buenos días', pt: 'Bom dia', fr: 'Bonjour', de: 'Guten Morgen', it: 'Buongiorno',
    zh: '早上好', ja: 'おはようございます', ko: '좋은 아침이에요', ar: 'صباح الخير',
  },
  'thank you': {
    es: 'Gracias', pt: 'Obrigado', fr: 'Merci', de: 'Danke', it: 'Grazie',
    zh: '谢谢', ja: 'ありがとう', ko: '감사합니다', ar: 'شكرا',
  },
  'how are you?': {
    es: '¿Cómo estás?', pt: 'Como você está?', fr: 'Comment vas-tu ?', de: 'Wie geht es dir?', it: 'Come stai?',
    zh: '你好吗？', ja: 'お元気ですか？', ko: '어떻게 지내세요?', ar: 'كيف حالك؟',
  },
  'nice to meet you': {
    es: 'Encantado de conocerte', pt: 'Prazer em te conhecer', fr: 'Enchanté', de: 'Schön, dich kennenzulernen', it: 'Piacere di conoscerti',
    zh: '很高兴认识你', ja: 'はじめまして', ko: '만나서 반갑습니다', ar: 'سعدت بلقائك',
  },
  'bonjour': {
    es: 'Hola', en: 'Hello', pt: 'Olá', de: 'Hallo', it: 'Ciao',
    zh: '你好', ja: 'こんにちは', ko: '안녕하세요', ar: 'مرحبا',
  },
  'merci': {
    es: 'Gracias', en: 'Thank you', pt: 'Obrigado', de: 'Danke', it: 'Grazie',
    zh: '谢谢', ja: 'ありがとう', ko: '감사합니다', ar: 'شكرا',
  },
  'guten morgen': {
    es: 'Buenos días', en: 'Good morning', pt: 'Bom dia', fr: 'Bonjour', it: 'Buongiorno',
    zh: '早上好', ja: 'おはようございます', ko: '좋은 아침이에요', ar: 'صباح الخير',
  },
  'hallo': {
    es: 'Hola', en: 'Hello', pt: 'Olá', fr: 'Bonjour', it: 'Ciao',
    zh: '你好', ja: 'こんにちは', ko: '안녕하세요', ar: 'مرحبا',
  },
  'ciao': {
    es: 'Hola', en: 'Hello', pt: 'Olá', fr: 'Bonjour', de: 'Hallo',
    zh: '你好', ja: 'こんにちは', ko: '안녕하세요', ar: 'مرحبا',
  },
  'olá': {
    es: 'Hola', en: 'Hello', fr: 'Bonjour', de: 'Hallo', it: 'Ciao',
    zh: '你好', ja: 'こんにちは', ko: '안녕하세요', ar: 'مرحبا',
  },
  'obrigado': {
    es: 'Gracias', en: 'Thank you', fr: 'Merci', de: 'Danke', it: 'Grazie',
    zh: '谢谢', ja: 'ありがとう', ko: '감사합니다', ar: 'شكرا',
  },
  'こんにちは': {
    es: 'Hola', en: 'Hello', pt: 'Olá', fr: 'Bonjour', de: 'Hallo', it: 'Ciao',
    zh: '你好', ko: '안녕하세요', ar: 'مرحبا',
  },
  'ありがとう': {
    es: 'Gracias', en: 'Thank you', pt: 'Obrigado', fr: 'Merci', de: 'Danke', it: 'Grazie',
    zh: '谢谢', ko: '감사합니다', ar: 'شكرا',
  },
  '你好': {
    es: 'Hola', en: 'Hello', pt: 'Olá', fr: 'Bonjour', de: 'Hallo', it: 'Ciao',
    ja: 'こんにちは', ko: '안녕하세요', ar: 'مرحبا',
  },
  '谢谢': {
    es: 'Gracias', en: 'Thank you', pt: 'Obrigado', fr: 'Merci', de: 'Danke', it: 'Grazie',
    ja: 'ありがとう', ko: '감사합니다', ar: 'شكرا',
  },
  '안녕하세요': {
    es: 'Hola', en: 'Hello', pt: 'Olá', fr: 'Bonjour', de: 'Hallo', it: 'Ciao',
    zh: '你好', ja: 'こんにちは', ar: 'مرحبا',
  },
  '감사합니다': {
    es: 'Gracias', en: 'Thank you', pt: 'Obrigado', fr: 'Merci', de: 'Danke', it: 'Grazie',
    zh: '谢谢', ja: 'ありがとう', ar: 'شكرا',
  },
  'مرحبا': {
    es: 'Hola', en: 'Hello', pt: 'Olá', fr: 'Bonjour', de: 'Hallo', it: 'Ciao',
    zh: '你好', ja: 'こんにちは', ko: '안녕하세요',
  },
  'شكرا': {
    es: 'Gracias', en: 'Thank you', pt: 'Obrigado', fr: 'Merci', de: 'Danke', it: 'Grazie',
    zh: '谢谢', ja: 'ありがとう', ko: '감사합니다',
  },
};

const languageHints: { code: LanguageCode; patterns: RegExp[] }[] = [
  { code: 'es', patterns: [/^[¿¡]|ó|á|é|í|ú|ñ/gi] },
  { code: 'en', patterns: [/\b(the|is|are|you|how|hello|thank)\b/gi] },
  { code: 'fr', patterns: [/[àâçéèêëîïôûùü]|bonjour|merci/gi] },
  { code: 'de', patterns: [/[äöüß]|guten|hallo|danke/gi] },
  { code: 'it', patterns: [/[àèéìíîòóù]|ciao|buongiorno|grazie/gi] },
  { code: 'pt', patterns: [/[ãõç]|olá|obrigad|bom dia/gi] },
  { code: 'zh', patterns: [/[\u4e00-\u9fff]/g] },
  { code: 'ja', patterns: [/[\u3040-\u30ff\u31f0-\u31ff]/g] },
  { code: 'ko', patterns: [/[\uac00-\ud7af]/g] },
  { code: 'ar', patterns: [/[\u0600-\u06ff]/g] },
];

export function detectLanguage(text: string): LanguageCode {
  let bestCode: LanguageCode = 'es';
  let bestScore = 0;
  for (const { code, patterns } of languageHints) {
    let score = 0;
    for (const pattern of patterns) {
      const matches = text.match(pattern);
      if (matches) score += matches.length;
    }
    if (score > bestScore) {
      bestScore = score;
      bestCode = code;
    }
  }
  return bestCode;
}

export async function translateText(
  text: string,
  sourceLanguage: LanguageCode | 'auto',
  targetLanguage: LanguageCode,
): Promise<TranslationResult> {
  const normalizedText = text.trim().toLowerCase();

  if (sourceLanguage === 'auto') {
    const detected = detectLanguage(normalizedText);
    if (detected === targetLanguage) {
      return { translatedText: text, detectedLanguage: detected, available: true };
    }
    const entry = demoDictionary[normalizedText];
    if (entry && entry[targetLanguage]) {
      return { translatedText: entry[targetLanguage], detectedLanguage: detected, available: true };
    }
    return { translatedText: '', detectedLanguage: detected, available: false };
  }

  if (sourceLanguage === targetLanguage) {
    return { translatedText: text, available: true };
  }

  const entry = demoDictionary[normalizedText];
  if (entry && entry[targetLanguage]) {
    return { translatedText: entry[targetLanguage], available: true };
  }

  return { translatedText: '', available: false };
}

export function isTranslationAvailable(text: string, source: LanguageCode | 'auto', target: LanguageCode): boolean {
  const normalized = text.trim().toLowerCase();
  if (source === target) return true;
  const entry = demoDictionary[normalized];
  return !!(entry && entry[target]);
}
