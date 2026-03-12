-- ============================================================
-- Hylthcare — Supabase SQL Migration
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- Region: eu-central-1 (Frankfurt)
-- ============================================================

-- ─── Extensions ─────────────────────────────────────────────────────────────
-- pgcrypto is enabled by default in Supabase; gen_random_uuid() is available.

-- ─── Table: providers ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.providers (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        text        UNIQUE NOT NULL,
  name        text        NOT NULL,
  specialty   text,
  tagline     text,
  about       text,
  location    text,
  template    text        NOT NULL DEFAULT 'warm'
                          CHECK (template IN ('minimal', 'bold', 'warm')),
  social      jsonb       DEFAULT '{}'::jsonb,
  photos      jsonb       DEFAULT '[]'::jsonb,
  verified    boolean     NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  user_id     uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Index for fast slug lookups (subdomain routing hits this constantly)
CREATE INDEX IF NOT EXISTS idx_providers_slug    ON public.providers (slug);
CREATE INDEX IF NOT EXISTS idx_providers_user_id ON public.providers (user_id);

-- ─── Table: slug_reservations ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.slug_reservations (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        text        UNIQUE NOT NULL,
  reserved_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_slug_reservations_slug ON public.slug_reservations (slug);

-- ─── Auto-update updated_at ──────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_providers_updated_at ON public.providers;
CREATE TRIGGER set_providers_updated_at
  BEFORE UPDATE ON public.providers
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ─── Row Level Security ──────────────────────────────────────────────────────

ALTER TABLE public.providers        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.slug_reservations ENABLE ROW LEVEL SECURITY;

-- providers: anyone can read (public profiles)
CREATE POLICY "Public profiles are readable by everyone"
  ON public.providers
  FOR SELECT
  USING (true);

-- providers: only authenticated users can insert
CREATE POLICY "Authenticated users can create a provider profile"
  ON public.providers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- providers: only the owner can update their profile
CREATE POLICY "Owners can update their own profile"
  ON public.providers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- providers: only the owner can delete their profile
CREATE POLICY "Owners can delete their own profile"
  ON public.providers
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- slug_reservations: only service role can write (no anon/authenticated policies)
-- The service role bypasses RLS entirely by design.
-- However we add an explicit read policy so the check-slug endpoint works:
CREATE POLICY "Service role can manage slug reservations"
  ON public.slug_reservations
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ─── Seed: reserved system slugs (run once) ─────────────────────────────────
-- These slugs can never be claimed by providers.
INSERT INTO public.slug_reservations (slug) VALUES
  ('www'),
  ('api'),
  ('app'),
  ('admin'),
  ('dashboard'),
  ('help'),
  ('support'),
  ('hylthcare'),
  ('status'),
  ('blog'),
  ('docs'),
  ('auth')
ON CONFLICT (slug) DO NOTHING;
