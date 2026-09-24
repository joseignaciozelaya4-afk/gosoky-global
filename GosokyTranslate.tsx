import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRightLeft, Copy, Check, Globe, Loader2, Volume2, Square, Sparkles, X } from 'lucide-react';
import {
  LANGUAGES, getLanguageFlag, getLanguageLabel,
  type LanguageCode, translateText,
} from '@/services/translationService';

type TranslatePanelProps = {
  open: boolean;
  onClose: () => void;
  initialText: string;
  preferredSource: LanguageCode | 'auto';
  preferredTarget: LanguageCode;
  onSavePreferences: (source: LanguageCode | 'auto', target: LanguageCode) => void;
};

type TranslationState = {
  status: 'idle' | 'loading' | 'done' | 'unavailable';
  result: string;
  detectedLanguage?: LanguageCode;
};

export function GosokyTranslate({
  open, onClose, initialText, preferredSource, preferredTarget, onSavePreferences,
}: TranslatePanelProps) {
  const [sourceLang, setSourceLang] = useState<LanguageCode | 'auto'>(preferredSource);
  const [targetLang, setTargetLang] = useState<LanguageCode>(preferredTarget);
  const [inputText, setInputText] = useState(initialText);
  const [translation, setTranslation] = useState<TranslationState>({ status: 'idle', result: '' });
  const [view, setView] = useState<'original' | 'translation'>('translation');
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (open) {
      setInputText(initialText);
      setTranslation({ status: 'idle', result: '' });
      setView('translation');
    }
  }, [open, initialText]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open && isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, [open, isPlaying]);

  useEffect(() => {
    return () => {
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function swapLanguages(): void {
    if (sourceLang === 'auto') return;
    const newSource = targetLang;
    const newTarget = sourceLang;
    setSourceLang(newSource);
    setTargetLang(newTarget);
    setTranslation({ status: 'idle', result: '' });
  }

  async function handleTranslate(): Promise<void> {
    if (!inputText.trim()) return;
    setTranslation({ status: 'loading', result: '' });
    const result = await translateText(inputText, sourceLang, targetLang);
    if (result.available) {
      setTranslation({ status: 'done', result: result.translatedText, detectedLanguage: result.detectedLanguage });
      setView('translation');
    } else {
      setTranslation({ status: 'unavailable', result: '', detectedLanguage: result.detectedLanguage });
    }
  }

  async function handleCopy(): Promise<void> {
    if (translation.status !== 'done' || !translation.result) return;
    try {
      await navigator.clipboard.writeText(translation.result);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function playAudio(): void {
    if (translation.status !== 'done' || !translation.result) return;
    if (isPlaying) {
      stopAudio();
      return;
    }
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(translation.result);
    utterance.lang = targetLang;
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  }

  function stopAudio(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  }

  function handleSavePreferences(): void {
    onSavePreferences(sourceLang, targetLang);
  }

  if (!open) return null;

  const detectedLabel = translation.detectedLanguage
    ? `${getLanguageLabel(translation.detectedLanguage)} ${getLanguageFlag(translation.detectedLanguage)}`
    : null;

  return (
    <>
      <div className="translate-overlay" onClick={onClose} aria-hidden="true" />
      <div className="translate-panel" role="dialog" aria-modal="true" aria-labelledby="translate-panel-title">
        <header className="translate-header">
          <div>
            <span className="chat-kicker">GOSOKY TRANSLATE</span>
            <h3 id="translate-panel-title">Habla con el mundo<br />sin barreras.</h3>
          </div>
          <button className="translate-close" onClick={onClose} aria-label="Volver al chat"><X size={18} /></button>
        </header>

        <div className="translate-body">
          <div className="translate-selectors">
            <div className="translate-field">
              <label htmlFor="translate-source">Idioma original</label>
              <select id="translate-source" value={sourceLang} onChange={(e) => { setSourceLang(e.target.value as LanguageCode | 'auto'); setTranslation({ status: 'idle', result: '' }); }}>
                <option value="auto">Detectar automáticamente</option>
                {LANGUAGES.map((lang) => <option key={lang.code} value={lang.code}>{lang.flag} {lang.label}</option>)}
              </select>
            </div>
            <button className="swap-btn" onClick={swapLanguages} disabled={sourceLang === 'auto'} aria-label="Cambiar idiomas"><ArrowRightLeft size={16} /></button>
            <div className="translate-field">
              <label htmlFor="translate-target">Traducir a</label>
              <select id="translate-target" value={targetLang} onChange={(e) => { setTargetLang(e.target.value as LanguageCode); setTranslation({ status: 'idle', result: '' }); }}>
                {LANGUAGES.map((lang) => <option key={lang.code} value={lang.code}>{lang.flag} {lang.label}</option>)}
              </select>
            </div>
          </div>

          <div className="translate-input-area">
            <textarea aria-label="Mensaje original" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Escribe o pega el texto a traducir..." rows={3} />
            {detectedLabel && translation.status !== 'idle' && (
              <div className="detected-lang"><Globe size={12} /> Idioma detectado: {detectedLabel}</div>
            )}
          </div>

          <button className="translate-btn" onClick={handleTranslate} disabled={!inputText.trim() || translation.status === 'loading'}>
            {translation.status === 'loading' ? <Loader2 size={16} className="spin" /> : <Sparkles size={16} />}
            TRADUCIR
          </button>

          {translation.status === 'done' && (
            <div className="translate-result">
              <div className="result-tabs">
                <button className={view === 'original' ? 'active' : ''} onClick={() => setView('original')}>Original</button>
                <button className={view === 'translation' ? 'active' : ''} onClick={() => setView('translation')}>Traducción</button>
              </div>
              <div className="result-content">
                {view === 'original' ? (
                  <p className="result-original">{inputText}</p>
                ) : (
                  <>
                    <p className="result-translated">{translation.result}</p>
                    <span className="translated-by"><Globe size={11} /> Traducido por Gosoky</span>
                  </>
                )}
              </div>
              <div className="result-actions">
                <button onClick={playAudio} disabled={view !== 'translation'}>
                  {isPlaying ? <Square size={14} /> : <Volume2 size={14} />}
                  {isPlaying ? 'Detener' : 'Escuchar'}
                </button>
                <button onClick={() => void handleCopy()} disabled={view !== 'translation'}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Traducción copiada' : 'Copiar'}
                </button>
              </div>
            </div>
          )}

          {translation.status === 'unavailable' && (
            <div className="translate-unavailable">
              <Globe size={20} />
              <p>Traducción disponible próximamente</p>
              <small>Esta frase aún no está contemplada en el modo demostración.</small>
            </div>
          )}

          <button className="save-prefs-btn" onClick={handleSavePreferences}>
            <Check size={14} /> Guardar como mis idiomas preferidos
          </button>
        </div>

        <footer className="translate-footer">
          <button className="back-to-chat" onClick={onClose}><ArrowLeft size={14} /> Volver al chat</button>
        </footer>
      </div>
    </>
  );
}
