-- 001_schema.sql — members/dinners/tags schema + Row-Level Security.
-- Canonical schema for the Neon Data API (PostgREST). Applied to the live DB via
-- the Neon MCP; this file is the source of truth for reproducing it.
--
-- The `authenticated` / `anonymous` Postgres roles are provisioned by the Neon
-- Data API. auth.user_id() comes from the pg_session_jwt extension (reads the
-- Clerk JWT `sub` claim). RLS is the ENTIRE security boundary: anon has no
-- grants (zero rows); authenticated reads the directory and updates only its own
-- member row.

CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE,
  email TEXT UNIQUE,                 -- nullable: stamped at sign-in (see 003 claim_member)
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  title TEXT, company TEXT, bio TEXT, photo_url TEXT,
  linkedin TEXT, twitter TEXT, website TEXT,
  role_type TEXT DEFAULT 'member',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tags (
  id TEXT PRIMARY KEY,               -- human-readable slug, e.g. 'llms', 'ai-agents'
  label TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS member_tags (
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  tag_id TEXT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (member_id, tag_id)
);

CREATE TABLE IF NOT EXISTS dinners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  venue TEXT, group_photo_url TEXT, description TEXT,
  topics JSONB DEFAULT '[]'::jsonb,
  beehiiv_url TEXT, discord_url TEXT, luma_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dinner_attendees (
  dinner_id UUID NOT NULL REFERENCES dinners(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'attendee',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (dinner_id, member_id)
);

ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE dinners ENABLE ROW LEVEL SECURITY;
ALTER TABLE dinner_attendees ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON members, tags, member_tags, dinners, dinner_attendees TO authenticated;
GRANT UPDATE ON members TO authenticated;
-- anon: intentionally NO grants.

CREATE POLICY members_select ON members FOR SELECT TO authenticated USING (true);
CREATE POLICY members_update_own ON members FOR UPDATE TO authenticated
  USING (clerk_user_id = auth.user_id()) WITH CHECK (clerk_user_id = auth.user_id());
CREATE POLICY tags_select ON tags FOR SELECT TO authenticated USING (true);
CREATE POLICY member_tags_select ON member_tags FOR SELECT TO authenticated USING (true);
CREATE POLICY dinners_select ON dinners FOR SELECT TO authenticated USING (true);
CREATE POLICY dinner_attendees_select ON dinner_attendees FOR SELECT TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_members_clerk_user_id ON members(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_members_slug ON members(slug);
CREATE INDEX IF NOT EXISTS idx_dinners_slug ON dinners(slug);
CREATE INDEX IF NOT EXISTS idx_dinners_date ON dinners(date);
CREATE INDEX IF NOT EXISTS idx_member_tags_member ON member_tags(member_id);
CREATE INDEX IF NOT EXISTS idx_member_tags_tag ON member_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_dinner_attendees_dinner ON dinner_attendees(dinner_id);
CREATE INDEX IF NOT EXISTS idx_dinner_attendees_member ON dinner_attendees(member_id);
