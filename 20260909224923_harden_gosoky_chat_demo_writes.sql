/*
# Harden Gosoky Chat demo write permissions

1. Scope
- Keeps the five seeded profiles, conversations, and participant rows readable.
- Prevents the public demo client from changing the controlled profile and conversation directory.

2. Permissions
- `profiles`: anonymous and authenticated clients can only read rows.
- `conversations`: anonymous and authenticated clients can only read rows.
- `conversation_participants`: anonymous and authenticated clients can only read rows.
- `messages`: clients may read, insert, and update messages, but cannot delete them.
- `translations`: clients may read, insert, and update translations, but cannot delete them.

3. Security Notes
- These are demo permissions because the app does not yet have sign-in. They prevent accidental directory tampering but do not replace per-account authorization.
- The future authenticated version must replace the demo policies with `auth.uid()` ownership and membership checks before production use.
- No existing rows are deleted or changed.
*/

REVOKE INSERT, UPDATE, DELETE ON public.profiles FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.conversations FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.conversation_participants FROM anon, authenticated;
REVOKE DELETE ON public.messages FROM anon, authenticated;
REVOKE DELETE ON public.translations FROM anon, authenticated;
