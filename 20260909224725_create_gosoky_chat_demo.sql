/*
# Create the Gosoky Chat demo data model

1. New Tables
- `profiles`: the five controlled demo profiles, with public display information only. No email or password is stored.
- `conversations`: one-to-one conversation records with a stable participant key.
- `conversation_participants`: the profiles belonging to each conversation.
- `messages`: text messages, sender, delivery status, and timestamps.
- `translations`: optional translated versions of messages, preserving the original message.

2. Seed Data
- Adds exactly five named demo profiles: José Godoy, Elena Osorno, Nachby Zelaya, Kenet Josting, and Selena Jared.
- Creates a conversation for every unique pair of demo profiles.
- Adds one Spanish welcome message to each conversation so the contact list can be tested immediately.

3. Security
- Enables row level security on every new table.
- Public demo profile and participant records are readable so the no-login test experience can show contacts.
- Conversation data is readable and writable only when the referenced conversation contains the requested participant relation. This is structural demo access control; real per-user authorization will require Supabase email authentication in a later step.
- No email addresses, passwords, API keys, or secrets are stored.

4. Important Notes
- This migration is additive and idempotent. Existing application data is not deleted or renamed.
- The demo uses the anon client intentionally because the current app has no sign-in screen yet.
*/

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name text NOT NULL,
  country text NOT NULL DEFAULT 'Honduras',
  language_code text NOT NULL DEFAULT 'es',
  avatar_initials text NOT NULL,
  avatar_color text NOT NULL DEFAULT '#3c8d78',
  status text NOT NULL DEFAULT 'offline' CHECK (status IN ('online', 'offline')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_key text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.conversation_participants (
  conversation_id uuid NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  joined_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (conversation_id, profile_id)
);

CREATE TABLE IF NOT EXISTS public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  body text NOT NULL CHECK (char_length(trim(body)) > 0),
  delivery_status text NOT NULL DEFAULT 'sent' CHECK (delivery_status IN ('sent', 'received', 'read')),
  created_at timestamptz NOT NULL DEFAULT now(),
  read_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid NOT NULL REFERENCES public.messages(id) ON DELETE CASCADE,
  source_language text NOT NULL DEFAULT 'es',
  target_language text NOT NULL,
  translated_text text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (message_id, target_language)
);

CREATE INDEX IF NOT EXISTS conversation_participants_profile_idx ON public.conversation_participants(profile_id);
CREATE INDEX IF NOT EXISTS messages_conversation_created_idx ON public.messages(conversation_id, created_at);
CREATE INDEX IF NOT EXISTS translations_message_idx ON public.translations(message_id);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.translations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "demo_read_profiles" ON public.profiles;
CREATE POLICY "demo_read_profiles" ON public.profiles FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "demo_insert_profiles" ON public.profiles;
CREATE POLICY "demo_insert_profiles" ON public.profiles FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "demo_update_profiles" ON public.profiles;
CREATE POLICY "demo_update_profiles" ON public.profiles FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "demo_delete_profiles" ON public.profiles;
CREATE POLICY "demo_delete_profiles" ON public.profiles FOR DELETE TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "demo_read_conversations" ON public.conversations;
CREATE POLICY "demo_read_conversations" ON public.conversations FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "demo_insert_conversations" ON public.conversations;
CREATE POLICY "demo_insert_conversations" ON public.conversations FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "demo_update_conversations" ON public.conversations;
CREATE POLICY "demo_update_conversations" ON public.conversations FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "demo_delete_conversations" ON public.conversations;
CREATE POLICY "demo_delete_conversations" ON public.conversations FOR DELETE TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "demo_read_participants" ON public.conversation_participants;
CREATE POLICY "demo_read_participants" ON public.conversation_participants FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "demo_insert_participants" ON public.conversation_participants;
CREATE POLICY "demo_insert_participants" ON public.conversation_participants FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "demo_update_participants" ON public.conversation_participants;
CREATE POLICY "demo_update_participants" ON public.conversation_participants FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "demo_delete_participants" ON public.conversation_participants;
CREATE POLICY "demo_delete_participants" ON public.conversation_participants FOR DELETE TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "demo_read_messages" ON public.messages;
CREATE POLICY "demo_read_messages" ON public.messages FOR SELECT TO anon, authenticated USING (EXISTS (SELECT 1 FROM public.conversation_participants cp WHERE cp.conversation_id = messages.conversation_id));
DROP POLICY IF EXISTS "demo_insert_messages" ON public.messages;
CREATE POLICY "demo_insert_messages" ON public.messages FOR INSERT TO anon, authenticated WITH CHECK (EXISTS (SELECT 1 FROM public.conversation_participants cp WHERE cp.conversation_id = messages.conversation_id));
DROP POLICY IF EXISTS "demo_update_messages" ON public.messages;
CREATE POLICY "demo_update_messages" ON public.messages FOR UPDATE TO anon, authenticated USING (EXISTS (SELECT 1 FROM public.conversation_participants cp WHERE cp.conversation_id = messages.conversation_id)) WITH CHECK (EXISTS (SELECT 1 FROM public.conversation_participants cp WHERE cp.conversation_id = messages.conversation_id));
DROP POLICY IF EXISTS "demo_delete_messages" ON public.messages;
CREATE POLICY "demo_delete_messages" ON public.messages FOR DELETE TO anon, authenticated USING (EXISTS (SELECT 1 FROM public.conversation_participants cp WHERE cp.conversation_id = messages.conversation_id));

DROP POLICY IF EXISTS "demo_read_translations" ON public.translations;
CREATE POLICY "demo_read_translations" ON public.translations FOR SELECT TO anon, authenticated USING (EXISTS (SELECT 1 FROM public.messages m JOIN public.conversation_participants cp ON cp.conversation_id = m.conversation_id WHERE m.id = translations.message_id));
DROP POLICY IF EXISTS "demo_insert_translations" ON public.translations;
CREATE POLICY "demo_insert_translations" ON public.translations FOR INSERT TO anon, authenticated WITH CHECK (EXISTS (SELECT 1 FROM public.messages m JOIN public.conversation_participants cp ON cp.conversation_id = m.conversation_id WHERE m.id = translations.message_id));
DROP POLICY IF EXISTS "demo_update_translations" ON public.translations;
CREATE POLICY "demo_update_translations" ON public.translations FOR UPDATE TO anon, authenticated USING (EXISTS (SELECT 1 FROM public.messages m JOIN public.conversation_participants cp ON cp.conversation_id = m.conversation_id WHERE m.id = translations.message_id)) WITH CHECK (EXISTS (SELECT 1 FROM public.messages m JOIN public.conversation_participants cp ON cp.conversation_id = m.conversation_id WHERE m.id = translations.message_id));
DROP POLICY IF EXISTS "demo_delete_translations" ON public.translations;
CREATE POLICY "demo_delete_translations" ON public.translations FOR DELETE TO anon, authenticated USING (EXISTS (SELECT 1 FROM public.messages m JOIN public.conversation_participants cp ON cp.conversation_id = m.conversation_id WHERE m.id = translations.message_id));

INSERT INTO public.profiles (id, display_name, country, language_code, avatar_initials, avatar_color, status)
VALUES
  ('10000000-0000-0000-0000-000000000001', 'José Godoy', 'Honduras', 'es', 'JG', '#3c8d78', 'online'),
  ('10000000-0000-0000-0000-000000000002', 'Elena Osorno', 'Honduras', 'es', 'EO', '#2d7890', 'online'),
  ('10000000-0000-0000-0000-000000000003', 'Nachby Zelaya', 'Honduras', 'es', 'NZ', '#b67f32', 'offline'),
  ('10000000-0000-0000-0000-000000000004', 'Kenet Josting', 'Honduras', 'es', 'KJ', '#806a9b', 'online'),
  ('10000000-0000-0000-0000-000000000005', 'Selena Jared', 'Honduras', 'es', 'SJ', '#a65c63', 'offline')
ON CONFLICT (id) DO UPDATE SET display_name = EXCLUDED.display_name, country = EXCLUDED.country, language_code = EXCLUDED.language_code, avatar_initials = EXCLUDED.avatar_initials, avatar_color = EXCLUDED.avatar_color, status = EXCLUDED.status;

INSERT INTO public.conversations (participant_key)
SELECT LEAST(p1.id::text, p2.id::text) || ':' || GREATEST(p1.id::text, p2.id::text)
FROM public.profiles p1
CROSS JOIN public.profiles p2
WHERE p1.id < p2.id
  AND p1.id IN ('10000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000005')
  AND p2.id IN ('10000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000005')
ON CONFLICT (participant_key) DO NOTHING;

INSERT INTO public.conversation_participants (conversation_id, profile_id)
SELECT c.id, p.id
FROM public.conversations c
JOIN public.profiles p ON c.participant_key LIKE '%' || p.id::text || '%'
WHERE p.id IN ('10000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000005')
ON CONFLICT DO NOTHING;

INSERT INTO public.messages (conversation_id, sender_profile_id, body, delivery_status)
SELECT c.id, split_part(c.participant_key, ':', 1)::uuid, 'Hola, ¿cómo estás? Qué gusto conectar contigo en Gosoky.', 'received'
FROM public.conversations c
WHERE NOT EXISTS (SELECT 1 FROM public.messages m WHERE m.conversation_id = c.id);

UPDATE public.conversations c
SET updated_at = COALESCE((SELECT max(m.created_at) FROM public.messages m WHERE m.conversation_id = c.id), c.updated_at);
