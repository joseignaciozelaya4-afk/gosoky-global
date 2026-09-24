/*
# Create persistent Gosoky Travel planning data

1. New Tables
- `travel_favorites`: saved travel items per controlled demo profile.
- `travel_itineraries`: saved trip plans and their day items per controlled demo profile.

2. Security
- Enables RLS on both tables.
- Demo access is scoped to rows with a valid seeded profile relation. This is structural demo access until real authentication replaces the profile selector.
- Four separate CRUD policies are defined for each table.
- No emails, passwords, payments, or secrets are stored.

3. Notes
- JSON itinerary days preserve the flexible demo planner shape while a production provider integration is pending.
- Existing data is not deleted or modified.
*/

CREATE TABLE IF NOT EXISTS public.travel_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  item_type text NOT NULL,
  item_id text NOT NULL,
  name text NOT NULL,
  subtitle text NOT NULL DEFAULT '',
  image text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (profile_id, item_type, item_id)
);

CREATE TABLE IF NOT EXISTS public.travel_itineraries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  destination_id text NOT NULL,
  days jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS travel_favorites_profile_idx ON public.travel_favorites(profile_id);
CREATE INDEX IF NOT EXISTS travel_itineraries_profile_idx ON public.travel_itineraries(profile_id);

ALTER TABLE public.travel_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.travel_itineraries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "demo_read_travel_favorites" ON public.travel_favorites;
CREATE POLICY "demo_read_travel_favorites" ON public.travel_favorites FOR SELECT TO anon, authenticated USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = travel_favorites.profile_id));
DROP POLICY IF EXISTS "demo_insert_travel_favorites" ON public.travel_favorites;
CREATE POLICY "demo_insert_travel_favorites" ON public.travel_favorites FOR INSERT TO anon, authenticated WITH CHECK (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = travel_favorites.profile_id));
DROP POLICY IF EXISTS "demo_update_travel_favorites" ON public.travel_favorites;
CREATE POLICY "demo_update_travel_favorites" ON public.travel_favorites FOR UPDATE TO anon, authenticated USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = travel_favorites.profile_id)) WITH CHECK (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = travel_favorites.profile_id));
DROP POLICY IF EXISTS "demo_delete_travel_favorites" ON public.travel_favorites;
CREATE POLICY "demo_delete_travel_favorites" ON public.travel_favorites FOR DELETE TO anon, authenticated USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = travel_favorites.profile_id));

DROP POLICY IF EXISTS "demo_read_travel_itineraries" ON public.travel_itineraries;
CREATE POLICY "demo_read_travel_itineraries" ON public.travel_itineraries FOR SELECT TO anon, authenticated USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = travel_itineraries.profile_id));
DROP POLICY IF EXISTS "demo_insert_travel_itineraries" ON public.travel_itineraries;
CREATE POLICY "demo_insert_travel_itineraries" ON public.travel_itineraries FOR INSERT TO anon, authenticated WITH CHECK (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = travel_itineraries.profile_id));
DROP POLICY IF EXISTS "demo_update_travel_itineraries" ON public.travel_itineraries;
CREATE POLICY "demo_update_travel_itineraries" ON public.travel_itineraries FOR UPDATE TO anon, authenticated USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = travel_itineraries.profile_id)) WITH CHECK (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = travel_itineraries.profile_id));
DROP POLICY IF EXISTS "demo_delete_travel_itineraries" ON public.travel_itineraries;
CREATE POLICY "demo_delete_travel_itineraries" ON public.travel_itineraries FOR DELETE TO anon, authenticated USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = travel_itineraries.profile_id));
