-- 004_data_api_views.sql: Read views for the Neon Data API (PostgREST)
--
-- The Neon Data API is PostgREST — it exposes tables/views/functions over REST,
-- not arbitrary SQL. The app needs each dinner with its attendee slugs and each
-- member with aggregated tag ids + dinner slugs, which require joins + array_agg.
-- We expose those as views so the client can `GET /dinners_view` / `GET /members_view`.
--
-- security_invoker = true (PG15+) makes the view run with the QUERYING role's
-- privileges, so the base-table RLS policies (auth.role() = 'authenticated', etc.)
-- still apply through the view. Without it the view would run as its owner and
-- bypass RLS — a data leak. We only GRANT SELECT to `authenticated` (never to
-- `anonymous`), so unauthenticated Data API requests get nothing.

-- Dinners + aggregated attendee slugs (shape matches useDinners' mapRowToDinner)
CREATE OR REPLACE VIEW dinners_view WITH (security_invoker = true) AS
SELECT
  d.id,
  d.slug,
  d.date,
  d.venue,
  d.group_photo_url,
  d.description,
  d.topics,
  d.beehiiv_url,
  d.discord_url,
  d.luma_url,
  array_agg(DISTINCT m.slug) FILTER (WHERE m.slug IS NOT NULL) AS attendee_slugs
FROM dinners d
LEFT JOIN dinner_attendees da ON da.dinner_id = d.id
LEFT JOIN members m ON m.id = da.member_id
GROUP BY d.id;

-- Members + aggregated tag ids + dinner slugs (shape matches useMembers' mapRowToMember)
CREATE OR REPLACE VIEW members_view WITH (security_invoker = true) AS
SELECT
  m.id,
  m.clerk_user_id,
  m.email,
  m.name,
  m.slug,
  m.title,
  m.company,
  m.bio,
  m.photo_url,
  m.linkedin,
  m.twitter,
  m.website,
  m.role_type,
  m.created_at,
  array_agg(DISTINCT mt.tag_id) FILTER (WHERE mt.tag_id IS NOT NULL) AS tag_ids,
  array_agg(DISTINCT d.slug) FILTER (WHERE d.slug IS NOT NULL) AS dinner_slugs
FROM members m
LEFT JOIN member_tags mt ON mt.member_id = m.id
LEFT JOIN dinner_attendees da ON da.member_id = m.id
LEFT JOIN dinners d ON d.id = da.dinner_id
-- Exclude auth placeholder rows (created by claim_member_by_email when a
-- sign-in email matches no seeded member). Real/seeded members always have a slug.
WHERE m.slug IS NOT NULL
GROUP BY m.id;

GRANT SELECT ON dinners_view TO authenticated;
GRANT SELECT ON members_view TO authenticated;

-- After applying, refresh the Data API schema cache so PostgREST sees the views:
--   neonctl data-api refresh-schema --project-id <id> --branch <id> --database neondb
-- (or click "Refresh schema cache" on the Data API page in the Neon Console).
