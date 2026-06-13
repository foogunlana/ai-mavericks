-- 001_schema.sql: Initial schema for Mavericks community app
-- Tables: members, dinners, tags, and join tables
-- RLS policies: enforce per-user access control

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_session_jwt";

-- Members table: user profiles
CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_user_id TEXT UNIQUE,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  title TEXT,
  company TEXT,
  bio TEXT,
  photo_url TEXT,
  linkedin TEXT,
  twitter TEXT,
  website TEXT,
  role_type TEXT DEFAULT 'member',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tags table: labels for categorization
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Member-to-tags join table
CREATE TABLE IF NOT EXISTS member_tags (
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (member_id, tag_id)
);

-- Dinners table: event records
CREATE TABLE IF NOT EXISTS dinners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  venue TEXT,
  group_photo_url TEXT,
  description TEXT,
  topics JSONB DEFAULT '[]'::jsonb,
  beehiiv_url TEXT,
  discord_url TEXT,
  luma_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Dinner attendees join table
CREATE TABLE IF NOT EXISTS dinner_attendees (
  dinner_id UUID NOT NULL REFERENCES dinners(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'attendee',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (dinner_id, member_id)
);

-- ============================================================================
-- ROW-LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE dinners ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE dinner_attendees ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- MEMBERS RLS POLICIES
-- ============================================================================

-- Policy: Anonymous (unauthenticated) users see NO rows
CREATE POLICY anon_no_access_members ON members
  FOR ALL USING (FALSE);

-- Policy: Authenticated users can SELECT all members (directory browsing)
CREATE POLICY authenticated_select_members ON members
  FOR SELECT USING (
    auth.role() = 'authenticated'
  );

-- Policy: Authenticated users can UPDATE only their own row
CREATE POLICY authenticated_update_own_member ON members
  FOR UPDATE USING (
    auth.role() = 'authenticated'
    AND auth.user_id() = clerk_user_id
  )
  WITH CHECK (
    auth.role() = 'authenticated'
    AND auth.user_id() = clerk_user_id
  );

-- Policy: Authenticated users CANNOT INSERT or DELETE
CREATE POLICY authenticated_no_insert_members ON members
  FOR INSERT WITH CHECK (FALSE);

CREATE POLICY authenticated_no_delete_members ON members
  FOR DELETE USING (FALSE);

-- ============================================================================
-- DINNERS RLS POLICIES
-- ============================================================================

-- Policy: Anonymous users see NO rows
CREATE POLICY anon_no_access_dinners ON dinners
  FOR ALL USING (FALSE);

-- Policy: Authenticated users can SELECT all dinners (read-only for now)
CREATE POLICY authenticated_select_dinners ON dinners
  FOR SELECT USING (
    auth.role() = 'authenticated'
  );

-- Policy: Dinners are seed/admin-only — no client writes allowed
CREATE POLICY authenticated_no_write_dinners ON dinners
  FOR INSERT WITH CHECK (FALSE);

CREATE POLICY authenticated_no_update_dinners ON dinners
  FOR UPDATE USING (FALSE);

CREATE POLICY authenticated_no_delete_dinners ON dinners
  FOR DELETE USING (FALSE);

-- ============================================================================
-- TAGS RLS POLICIES
-- ============================================================================

-- Policy: Anonymous users see NO rows
CREATE POLICY anon_no_access_tags ON tags
  FOR ALL USING (FALSE);

-- Policy: Authenticated users can SELECT all tags
CREATE POLICY authenticated_select_tags ON tags
  FOR SELECT USING (
    auth.role() = 'authenticated'
  );

-- Policy: No client writes to tags
CREATE POLICY authenticated_no_write_tags ON tags
  FOR INSERT WITH CHECK (FALSE);

CREATE POLICY authenticated_no_update_tags ON tags
  FOR UPDATE USING (FALSE);

CREATE POLICY authenticated_no_delete_tags ON tags
  FOR DELETE USING (FALSE);

-- ============================================================================
-- MEMBER_TAGS RLS POLICIES
-- ============================================================================

-- Policy: Anonymous users see NO rows
CREATE POLICY anon_no_access_member_tags ON member_tags
  FOR ALL USING (FALSE);

-- Policy: Authenticated users can SELECT all member-tag associations
CREATE POLICY authenticated_select_member_tags ON member_tags
  FOR SELECT USING (
    auth.role() = 'authenticated'
  );

-- Policy: No client writes to member_tags (admin/seed only)
CREATE POLICY authenticated_no_write_member_tags ON member_tags
  FOR INSERT WITH CHECK (FALSE);

CREATE POLICY authenticated_no_update_member_tags ON member_tags
  FOR UPDATE USING (FALSE);

CREATE POLICY authenticated_no_delete_member_tags ON member_tags
  FOR DELETE USING (FALSE);

-- ============================================================================
-- DINNER_ATTENDEES RLS POLICIES
-- ============================================================================

-- Policy: Anonymous users see NO rows
CREATE POLICY anon_no_access_dinner_attendees ON dinner_attendees
  FOR ALL USING (FALSE);

-- Policy: Authenticated users can SELECT all dinner attendances
CREATE POLICY authenticated_select_dinner_attendees ON dinner_attendees
  FOR SELECT USING (
    auth.role() = 'authenticated'
  );

-- Policy: No client writes to dinner_attendees (admin/seed only)
CREATE POLICY authenticated_no_write_dinner_attendees ON dinner_attendees
  FOR INSERT WITH CHECK (FALSE);

CREATE POLICY authenticated_no_update_dinner_attendees ON dinner_attendees
  FOR UPDATE USING (FALSE);

CREATE POLICY authenticated_no_delete_dinner_attendees ON dinner_attendees
  FOR DELETE USING (FALSE);

-- ============================================================================
-- INDEXES for query performance
-- ============================================================================

CREATE INDEX idx_members_clerk_user_id ON members(clerk_user_id);
CREATE INDEX idx_members_email ON members(email);
CREATE INDEX idx_members_slug ON members(slug);
CREATE INDEX idx_dinners_slug ON dinners(slug);
CREATE INDEX idx_dinners_date ON dinners(date);
CREATE INDEX idx_member_tags_member_id ON member_tags(member_id);
CREATE INDEX idx_member_tags_tag_id ON member_tags(tag_id);
CREATE INDEX idx_dinner_attendees_dinner_id ON dinner_attendees(dinner_id);
CREATE INDEX idx_dinner_attendees_member_id ON dinner_attendees(member_id);
