import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CheckCheck, Circle, Globe, Languages, Phone, Send, Settings, UserRound, Video } from 'lucide-react';
import { GosokyTranslate } from '@/components/GosokyTranslate';
import { supabase } from '@/lib/supabase';
import { getLanguageFlag, getLanguageLabel, translateText, type LanguageCode } from '@/services/translationService';

type Profile = {
  id: string;
  name: string;
  country: string;
  language: string;
  status: 'online' | 'offline';
  initials: string;
  color: string;
};

type MessageTranslation = { text: string; targetLang: LanguageCode };

type ChatMessage = {
  id: string;
  senderId: string;
  text: string;
  time: string;
  createdAt: string;
  status: 'sent' | 'received' | 'read';
  translation?: MessageTranslation;
  translationUnavailable?: boolean;
};

type Conversation = { id: string; participantKey: string };

type Preferences = { source: LanguageCode | 'auto'; target: LanguageCode };

const PREFS_KEY = 'gosoky-translate-prefs';
const PROFILE_KEY = 'gosoky-current-profile';

function loadPreferences(): Preferences {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as Partial<Preferences>;
      return { source: saved.source ?? 'auto', target: saved.target ?? 'en' };
    }
  } catch { /* Use the defaults when storage is unavailable. */ }
  return { source: 'auto', target: 'en' };
}

function loadCurrentProfileId(): string | null {
  try {
    return localStorage.getItem(PROFILE_KEY);
  } catch {
    return null;
  }
}

function formatMessageTime(value: string): string {
  return new Intl.DateTimeFormat('es', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(value));
}

function formatLastMessageTime(value: string | undefined): string {
  if (!value) return '';
  const date = new Date(value);
  const today = new Date();
  if (date.toDateString() === today.toDateString()) return formatMessageTime(value);
  return new Intl.DateTimeFormat('es', { day: '2-digit', month: '2-digit' }).format(date);
}

function loadSharedDraft(): string {
  try {
    const raw = localStorage.getItem('gosoky-chat-share');
    if (!raw) return '';
    const item = JSON.parse(raw) as { name?: string; subtitle?: string };
    return item.name ? `Mira este lugar en Gosoky Travel: ${item.name} · ${item.subtitle ?? ''}` : '';
  } catch {
    return '';
  }
}

function toProfile(row: { id: string; display_name: string; country: string; language_code: string; avatar_initials: string; avatar_color: string; status: 'online' | 'offline' }): Profile {
  return {
    id: row.id,
    name: row.display_name,
    country: row.country,
    language: getLanguageLabel(row.language_code as LanguageCode),
    status: row.status,
    initials: row.avatar_initials,
    color: row.avatar_color,
  };
}

export function GosokyChat() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentProfileId, setCurrentProfileId] = useState<string | null>(loadCurrentProfileId);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({});
  const [messageText, setMessageText] = useState(loadSharedDraft);
  const [translateOpen, setTranslateOpen] = useState(false);
  const [panelText, setPanelText] = useState('');
  const [translatingMessageId, setTranslatingMessageId] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<Preferences>(loadPreferences);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [conversationLoading, setConversationLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentProfile = useMemo(() => profiles.find((profile) => profile.id === currentProfileId) ?? null, [profiles, currentProfileId]);
  const selectedContact = useMemo(() => profiles.find((profile) => profile.id === selectedId) ?? null, [profiles, selectedId]);
  const visibleMessages = conversation ? messages[conversation.id] ?? [] : [];

  const loadProfiles = useCallback(async (): Promise<void> => {
    const { data, error: profilesError } = await supabase
      .from('profiles')
      .select('id, display_name, country, language_code, avatar_initials, avatar_color, status')
      .order('display_name');
    if (profilesError) throw profilesError;
    const nextProfiles = (data ?? []).map(toProfile);
    setProfiles(nextProfiles);
    const { data: previewRows } = await supabase
      .from('messages')
      .select('id, conversation_id, sender_profile_id, body, delivery_status, created_at')
      .order('created_at', { ascending: true });
    const previewMessages = (previewRows ?? []).reduce<Record<string, ChatMessage[]>>((grouped, message) => {
      const existing = grouped[message.conversation_id] ?? [];
      grouped[message.conversation_id] = [...existing, {
        id: message.id,
        senderId: message.sender_profile_id,
        text: message.body,
        time: formatMessageTime(message.created_at),
        createdAt: message.created_at,
        status: message.delivery_status,
      }];
      return grouped;
    }, {});
    setMessages((current) => ({ ...current, ...previewMessages }));
    setCurrentProfileId((previous) => {
      const savedId = previous && nextProfiles.some((profile) => profile.id === previous) ? previous : nextProfiles[0]?.id ?? null;
      if (savedId && savedId !== previous) {
        try { localStorage.setItem(PROFILE_KEY, savedId); } catch { /* Storage is optional. */ }
      }
      return savedId;
    });
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    loadProfiles().catch(() => {
      if (active) setError('No se pudieron cargar los perfiles de prueba.');
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, [loadProfiles]);

  const loadConversation = useCallback(async (contactId: string): Promise<void> => {
    if (!currentProfileId) return;
    const participantKey = [currentProfileId, contactId].sort().join(':');
    setConversationLoading(true);
    setError(null);
    const { data: conversationRow, error: conversationError } = await supabase
      .from('conversations')
      .select('id, participant_key')
      .eq('participant_key', participantKey)
      .maybeSingle();
    if (conversationError) {
      setError('No se pudo abrir esta conversación.');
      setConversationLoading(false);
      return;
    }
    if (!conversationRow) {
      setError('Esta conversación todavía no está disponible.');
      setConversationLoading(false);
      return;
    }

    const { data: messageRows, error: messagesError } = await supabase
      .from('messages')
      .select('id, sender_profile_id, body, delivery_status, created_at, read_at')
      .eq('conversation_id', conversationRow.id)
      .order('created_at', { ascending: true });
    if (messagesError) {
      setError('No se pudieron cargar los mensajes.');
      setConversationLoading(false);
      return;
    }

    const ids = (messageRows ?? []).map((message) => message.id);
    const { data: translationRows } = ids.length
      ? await supabase.from('translations').select('message_id, target_language, translated_text').in('message_id', ids)
      : { data: [] };
    const translationsByMessage = new Map((translationRows ?? []).map((translation) => [translation.message_id, translation]));
    const nextMessages: ChatMessage[] = (messageRows ?? []).map((message) => {
      const translation = translationsByMessage.get(message.id);
      return {
        id: message.id,
        senderId: message.sender_profile_id,
        text: message.body,
        time: formatMessageTime(message.created_at),
        createdAt: message.created_at,
        status: message.delivery_status,
        translation: translation ? { text: translation.translated_text, targetLang: translation.target_language as LanguageCode } : undefined,
      };
    });
    setConversation({ id: conversationRow.id, participantKey: conversationRow.participant_key });
    setMessages((current) => ({ ...current, [conversationRow.id]: nextMessages }));
    setConversationLoading(false);

    const incomingIds = (messageRows ?? []).filter((message) => message.sender_profile_id !== currentProfileId && message.delivery_status !== 'read').map((message) => message.id);
    if (incomingIds.length) {
      await supabase.from('messages').update({ delivery_status: 'read', read_at: new Date().toISOString() }).in('id', incomingIds);
    }
  }, [currentProfileId]);

  useEffect(() => {
    if (selectedId) void loadConversation(selectedId);
  }, [loadConversation, selectedId]);

  useEffect(() => {
    if (!conversation) return;
    const channel = supabase
      .channel(`gosoky-conversation-${conversation.id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages', filter: `conversation_id=eq.${conversation.id}` }, () => { void loadConversation(selectedId ?? ''); })
      .subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [conversation, loadConversation, selectedId]);

  function selectProfile(profileId: string): void {
    setCurrentProfileId(profileId);
    setSelectedId(null);
    setConversation(null);
    setMessages({});
    try { localStorage.setItem(PROFILE_KEY, profileId); } catch { /* Storage is optional. */ }
  }

  function openConversation(contactId: string): void {
    if (contactId === currentProfileId) return;
    setSelectedId(contactId);
    setMessageText('');
    setError(null);
  }

  async function sendMessage(): Promise<void> {
    const text = messageText.trim();
    if (!conversation || !currentProfileId || !text) return;
    const { error: sendError } = await supabase.from('messages').insert({
      conversation_id: conversation.id,
      sender_profile_id: currentProfileId,
      body: text,
      delivery_status: 'sent',
    });
    if (sendError) {
      setError('No se pudo enviar el mensaje.');
      return;
    }
    setMessageText('');
    try { localStorage.removeItem('gosoky-chat-share'); } catch { /* storage optional */ }
    void loadConversation(selectedId ?? '');
  }

  function openTranslatePanel(text: string): void {
    setPanelText(text);
    setTranslateOpen(true);
  }

  async function translateMessage(messageId: string, text: string): Promise<void> {
    if (!conversation) return;
    setTranslatingMessageId(messageId);
    const result = await translateText(text, 'auto', preferences.target);
    if (!result.available || !result.translatedText) {
      setMessages((current) => ({ ...current, [conversation.id]: (current[conversation.id] ?? []).map((message) => message.id === messageId ? { ...message, translationUnavailable: true } : message) }));
      setTranslatingMessageId(null);
      return;
    }
    const sourceLanguage = result.detectedLanguage ?? (preferences.source === 'auto' ? 'es' : preferences.source);
    const { error: translationError } = await supabase.from('translations').upsert({
      message_id: messageId,
      source_language: sourceLanguage,
      target_language: preferences.target,
      translated_text: result.translatedText,
    }, { onConflict: 'message_id,target_language' });
    if (translationError) {
      setError('No se pudo guardar la traducción.');
    } else {
      setMessages((current) => ({ ...current, [conversation.id]: (current[conversation.id] ?? []).map((message) => message.id === messageId ? { ...message, translation: { text: result.translatedText, targetLang: preferences.target }, translationUnavailable: false } : message) }));
    }
    setTranslatingMessageId(null);
  }

  function removeTranslation(messageId: string): void {
    if (!conversation) return;
    setMessages((current) => ({ ...current, [conversation.id]: (current[conversation.id] ?? []).map((message) => message.id === messageId ? { ...message, translation: undefined, translationUnavailable: false } : message) }));
  }

  function savePreferences(source: LanguageCode | 'auto', target: LanguageCode): void {
    const next = { source, target };
    setPreferences(next);
    try { localStorage.setItem(PREFS_KEY, JSON.stringify(next)); } catch { /* Storage is optional. */ }
  }

  return (
    <section id="chat" className="chat-section">
      <div className="container">
        <div className="chat-heading">
          <div><p className="section-label"><span />GOSOKY CHAT · TRADUCE</p><h2>La puerta al mundo,<br /><span>sin barreras.</span></h2></div>
          <p>Una prueba controlada con cinco perfiles de Gosoky. Conversa, guarda tu historial y traduce mensajes sin perder el texto original.</p>
        </div>

        <div className="chat-profile-bar">
          <div className="current-profile-summary">
            {currentProfile ? <span className="avatar avatar-tiny" style={{ backgroundColor: currentProfile.color }}>{currentProfile.initials}</span> : <UserRound size={17} />}
            <div><small>CONVERSAR COMO</small><strong>{currentProfile?.name ?? 'Cargando perfil...'}</strong></div>
          </div>
          <select value={currentProfileId ?? ''} onChange={(event) => selectProfile(event.target.value)} aria-label="Seleccionar perfil de prueba">
            {profiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.name}{profile.id === currentProfileId ? ' · Tú' : ''}</option>)}
          </select>
          <button className="profile-settings-toggle" onClick={() => setSettingsOpen((open) => !open)} aria-expanded={settingsOpen} aria-controls="chat-settings"><Settings size={15} /> Configuración</button>
        </div>
        {settingsOpen && <div id="chat-settings" className="profile-settings"><div><span className="chat-kicker">PERFIL DE IDIOMA</span><strong>{currentProfile?.name}</strong><small>Los cambios se guardan para esta aplicación.</small></div><label>Mi idioma principal<select value={preferences.source} onChange={(event) => setPreferences((current) => ({ ...current, source: event.target.value as LanguageCode | 'auto' }))}><option value="auto">Detectar automáticamente</option>{['es', 'en', 'pt', 'fr', 'de', 'it', 'zh', 'ja', 'ko', 'ar'].map((code) => <option key={code} value={code}>{getLanguageFlag(code as LanguageCode)} {getLanguageLabel(code as LanguageCode)}</option>)}</select></label><label>Idioma de traducción preferido<select value={preferences.target} onChange={(event) => setPreferences((current) => ({ ...current, target: event.target.value as LanguageCode }))}>{['es', 'en', 'pt', 'fr', 'de', 'it', 'zh', 'ja', 'ko', 'ar'].map((code) => <option key={code} value={code}>{getLanguageFlag(code as LanguageCode)} {getLanguageLabel(code as LanguageCode)}</option>)}</select></label><button onClick={() => savePreferences(preferences.source, preferences.target)}>Guardar preferencias</button></div>}

        <div className={`chat-shell ${selectedContact ? 'conversation-open' : ''}`}>
          <aside className="contact-panel" aria-label="Lista de contactos">
            <div className="chat-panel-header"><div><span className="chat-kicker">GOSOKY GLOBAL</span><h3>Contactos</h3></div><span className="contact-count">{profiles.length} perfiles</span></div>
            <div className="contact-list">
              {loading && <div className="chat-loading">Cargando perfiles...</div>}
              {!loading && profiles.map((profile) => {
                const isCurrent = profile.id === currentProfileId;
                const contactMessages = Object.values(messages).flat().filter((message) => message.senderId === profile.id || (message.senderId === currentProfileId && selectedId === profile.id));
                const lastMessage = contactMessages[contactMessages.length - 1];
                return <button className={`contact-item ${selectedId === profile.id ? 'selected' : ''} ${isCurrent ? 'current' : ''}`} key={profile.id} onClick={() => openConversation(profile.id)} disabled={isCurrent}><span className="avatar" style={{ backgroundColor: profile.color }}>{profile.initials}<i className={profile.status === 'online' ? 'online' : ''} /></span><span className="contact-copy"><strong>{profile.name}{isCurrent ? ' · Tú' : ''}</strong><small>{profile.country} · {profile.language}</small><em>{lastMessage?.text ?? (isCurrent ? 'Tu perfil de prueba' : 'Abrir conversación privada')}</em></span><span className="contact-status"><Circle size={8} fill="currentColor" />{isCurrent ? 'Tu perfil' : profile.status === 'online' ? 'En línea' : 'Offline'}{lastMessage && <time>{formatLastMessageTime(lastMessage.createdAt)}</time>}</span></button>;
              })}
            </div>
          </aside>

          <div className="conversation-panel">
            {!selectedContact ? <div className="empty-chat"><div className="empty-chat-mark"><Languages size={29} /></div><span className="chat-kicker">COMUNICA · TRADUCE · PERTENECE</span><h3>Elige un contacto<br />para comenzar.</h3><p>Selecciona uno de los otros perfiles para abrir una conversación privada.</p></div> : <>
              <header className="conversation-header"><button className="back-to-contacts" onClick={() => { setSelectedId(null); setConversation(null); }} aria-label="Volver a contactos"><ArrowLeft size={18} /></button><span className="avatar avatar-small" style={{ backgroundColor: selectedContact.color }}>{selectedContact.initials}<i className={selectedContact.status === 'online' ? 'online' : ''} /></span><div><h3>{selectedContact.name}</h3><p>{selectedContact.country} · {selectedContact.language} · <span className={selectedContact.status === 'online' ? 'status-online' : ''}>{selectedContact.status === 'online' ? 'En línea' : 'Desconectado'}</span></p></div><div className="conversation-tools"><button className="chat-utility-btn" disabled title="Llamadas de voz: próximamente" aria-label="Llamada de voz próximamente"><Phone size={15} /></button><button className="chat-utility-btn" disabled title="Videollamadas: próximamente" aria-label="Videollamada próximamente"><Video size={15} /></button><button className="translate-toggle-btn" onClick={() => openTranslatePanel(messageText)} aria-label="Abrir traductor"><Globe size={17} /><span>TRADUCIR</span></button></div></header>
              <div className="message-area" aria-live="polite"><div className="conversation-note">GOSOKY CHAT · HISTORIAL GUARDADO</div>{conversationLoading && <div className="chat-loading">Cargando conversación...</div>}{visibleMessages.map((message) => <div className={`message-row ${message.senderId === currentProfileId ? 'sent' : 'received'}`} key={message.id}><div className="message-bubble"><p>{message.text}</p>{message.translation && <div className="message-translation"><div className="translation-divider" /><span className="translation-label">{getLanguageFlag(message.translation.targetLang)} {getLanguageLabel(message.translation.targetLang)}</span><p className="translation-text">{message.translation.text}</p><span className="translated-by-inline"><Globe size={10} /> Traducido por Gosoky</span></div>}{message.translationUnavailable && <div className="message-translation translation-unavailable-inline"><div className="translation-divider" /><span className="translation-label"><Globe size={10} /> Traducción disponible próximamente</span><small>Esta frase aún no está contemplada en el modo demostración.</small></div>}<div className="message-footer"><span>{message.time} {message.senderId === currentProfileId && <>{message.status === 'read' ? <CheckCheck size={13} /> : <CheckCheck size={13} />}</>}</span><button className="msg-translate-btn" onClick={() => message.translation || message.translationUnavailable ? removeTranslation(message.id) : void translateMessage(message.id, message.text)} disabled={translatingMessageId === message.id}>{translatingMessageId === message.id ? 'Traduciendo...' : message.translation || message.translationUnavailable ? 'Quitar traducción' : 'Traducir'}</button></div></div></div>)}</div>
              <div className="composer-area"><div className="translation-prep"><Globe size={14} /><span>GOSOKY TRANSLATE</span><small>Elige tu idioma preferido desde Configuración.</small></div><div className="composer"><input value={messageText} onChange={(event) => setMessageText(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); void sendMessage(); } }} placeholder="Escribe un mensaje..." aria-label="Escribe un mensaje" /><button onClick={() => void sendMessage()} disabled={!messageText.trim()} aria-label="Enviar mensaje"><Send size={17} /></button></div><small className="composer-hint">Enter para enviar · TRADUCIR abre el traductor · Historial guardado en Gosoky</small></div>
            </>}
          </div>
        </div>
        {error && <div className="chat-error" role="alert">{error}</div>}
      </div>
      <GosokyTranslate open={translateOpen} onClose={() => setTranslateOpen(false)} initialText={panelText} preferredSource={preferences.source} preferredTarget={preferences.target} onSavePreferences={savePreferences} />
    </section>
  );
}
