-- 004_data_api_views.sql — Read views the client queries via the Data API.
-- security_invoker = true so the underlying table RLS still applies (the view
-- runs with the caller's role, not the definer's).

CREATE OR REPLACE VIEW members_with_relations WITH (security_invoker = true) AS
SELECT m.id, m.clerk_user_id, m.email, m.name, m.slug, m.title, m.company, m.bio,
       m.photo_url, m.linkedin, m.twitter, m.website, m.role_type, m.created_at,
       array_remove(array_agg(DISTINCT mt.tag_id), NULL) AS tag_ids,
       array_remove(array_agg(DISTINCT d.slug), NULL)   AS dinner_slugs
FROM members m
LEFT JOIN member_tags mt      ON mt.member_id = m.id
LEFT JOIN dinner_attendees da ON da.member_id = m.id
LEFT JOIN dinners d           ON d.id = da.dinner_id
GROUP BY m.id;

CREATE OR REPLACE VIEW dinners_with_relations WITH (security_invoker = true) AS
SELECT d.id, d.slug, d.date, d.venue, d.group_photo_url, d.description, d.topics,
       d.beehiiv_url, d.discord_url, d.luma_url,
       array_remove(array_agg(DISTINCT m.slug), NULL) AS attendee_slugs
FROM dinners d
LEFT JOIN dinner_attendees da ON da.dinner_id = d.id
LEFT JOIN members m           ON m.id = da.member_id
GROUP BY d.id;

GRANT SELECT ON members_with_relations TO authenticated;
GRANT SELECT ON dinners_with_relations TO authenticated;
