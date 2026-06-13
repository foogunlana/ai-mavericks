# Schema and Row-Level Security (RLS)

This document describes the Mavericks database schema and the RLS policies that enforce member-only access.

## Schema Overview

All tables mirror the data types in `src/types.ts` and are stored in Neon Postgres.

### Tables

#### members
User profiles, linked to Clerk authentication via `clerk_user_id`.

```
id               UUID (PK)
clerk_user_id    TEXT (unique, references Clerk user ID)
email            TEXT (unique)
name             TEXT
slug             TEXT (unique, URL-safe identifier)
title            TEXT (job title)
company          TEXT
bio              TEXT
photo_url        TEXT
linkedin         TEXT (URL)
twitter          TEXT (handle or URL)
website          TEXT (URL)
role_type        TEXT (default: 'member', enum: 'member'|'moderator'|'founder')
created_at       TIMESTAMPTZ (auto)
updated_at       TIMESTAMPTZ (auto)
```

#### tags
Labels for categorizing members and topics.

```
id               UUID (PK)
label            TEXT (e.g., "ML Engineer", "Founder")
category         TEXT (e.g., "role", "interest")
created_at       TIMESTAMPTZ (auto)
```

#### dinners
Dinner event records.

```
id               UUID (PK)
slug             TEXT (unique, URL-safe identifier)
date             TIMESTAMPTZ (event date/time)
venue            TEXT (location)
group_photo_url  TEXT
description      TEXT
topics           JSONB (array of topic strings)
beehiiv_url      TEXT (newsletter post)
discord_url      TEXT (discussion thread)
luma_url         TEXT (event registration)
created_at       TIMESTAMPTZ (auto)
updated_at       TIMESTAMPTZ (auto)
```

#### member_tags (Join Table)
Links members to their tags.

```
member_id        UUID (FK → members)
tag_id           UUID (FK → tags)
```

#### dinner_attendees (Join Table)
Links members to dinners they attended.

```
dinner_id        UUID (FK → dinners)
member_id        UUID (FK → members)
role             TEXT (e.g., "attendee", "speaker", "moderator")
created_at       TIMESTAMPTZ (auto)
```

## Row-Level Security (RLS)

RLS is the **entire security boundary** — incorrect policies = data leaks. All policies use the `auth.user_id()` function (which returns the Clerk user ID from the JWT's `sub` claim).

### Policy Model

| Role | Access | Details |
|------|--------|---------|
| **anon** (no JWT) | ❌ No access | `FALSE` on all tables → 0 rows returned |
| **authenticated** | ✓ Read directory | SELECT all rows on members, dinners, tags, join tables |
| **authenticated** | ✓ Update own profile | UPDATE own member row (where `clerk_user_id = auth.user_id()`) |
| **authenticated** | ❌ No writes to dinners | INSERT/UPDATE/DELETE denied (admin/seed only) |
| **authenticated** | ❌ No writes to tags | INSERT/UPDATE/DELETE denied (admin/seed only) |
| **authenticated** | ❌ No writes to join tables | INSERT/UPDATE/DELETE denied (admin/seed only) |

### Applying RLS

Each table has RLS enabled:

```sql
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE dinners ENABLE ROW LEVEL SECURITY;
-- ... etc for all tables
```

### Policies Detail

#### members table

- **anon_no_access_members**: `FOR ALL USING (FALSE)` → no rows for anon
- **authenticated_select_members**: `FOR SELECT USING (auth.role() = 'authenticated')` → all rows visible to logged-in users
- **authenticated_update_own_member**: `FOR UPDATE USING (auth.user_id() = clerk_user_id)` → can only update own row
- **authenticated_no_insert_members**, **authenticated_no_delete_members**: `WITH CHECK (FALSE)` / `USING (FALSE)` → no client inserts/deletes

#### dinners, tags, member_tags, dinner_attendees tables

- **anon_no_access_***: `FOR ALL USING (FALSE)` → no rows for anon
- **authenticated_select_***: `FOR SELECT USING (auth.role() = 'authenticated')` → read-only for all authenticated users
- **authenticated_no_write_***: All INSERT/UPDATE/DELETE policies use `FALSE` → admin/seed writes only (via direct SQL or admin panel)

## Key Security Guarantees

1. **Unauthenticated users = no data**: Any request without a valid Clerk JWT is treated as `anon` role and returns 0 rows from all tables.
2. **Authenticated users are isolated**: A user can only modify their own member row; dinners are immutable from the client.
3. **Default-deny for writes**: All INSERT/UPDATE/DELETE are denied unless explicitly allowed (e.g., member updating own row).
4. **Admin/seed data**: Dinners, tags, and join tables are populated by backend seed scripts or admin tools (outside the RLS boundary).

## Testing

### Test 1: Anon token → 0 rows

```bash
# No JWT, no Authorization header
curl -X POST https://xxxxx.neon.tech/sql \
  -H "Content-Type: application/json" \
  -d '{"statement": "SELECT COUNT(*) FROM members;"}'
# Expected: 0 rows or 403 Unauthorized
```

### Test 2: Authenticated token → full directory read

```bash
# With valid Clerk JWT
curl -X POST https://xxxxx.neon.tech/sql \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{"statement": "SELECT id, name, email FROM members;"}'
# Expected: all members in result set
```

### Test 3: Authenticated update own row → allowed

```bash
# User updates own row
curl -X POST https://xxxxx.neon.tech/sql \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{
    "statement": "UPDATE members SET bio = '\''New bio'\'' WHERE clerk_user_id = auth.user_id();"
  }'
# Expected: 1 row updated
```

### Test 4: Authenticated update another member → denied

```bash
# User tries to update someone else
curl -X POST https://xxxxx.neon.tech/sql \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{
    "statement": "UPDATE members SET bio = '\''Hacked'\'' WHERE id = '\''<some-other-id>'\'';"
  }'
# Expected: 0 rows updated (RLS silently denies)
```

### Test 5: Authenticated insert → denied

```bash
# User tries to insert a new member
curl -X POST https://xxxxx.neon.tech/sql \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{
    "statement": "INSERT INTO members (clerk_user_id, email, name) VALUES ('\''user_123'\'', '\''test@ex.com'\'', '\''Test'\'');"
  }'
# Expected: 0 rows inserted (RLS denies)
```

## Running the Migration

### Via Neon SQL Editor

1. Go to Neon Dashboard → **SQL Editor**
2. Open the `public` schema
3. Copy the contents of `db/migrations/001_schema.sql` and paste into the editor
4. Run the migration
5. Verify: tables created, indexes added, policies in place

### Via CLI (`psql`)

```bash
# Get your Neon connection string from the dashboard
export DATABASE_URL="postgresql://user:password@xxxxx.neon.tech/neondb"

# Run the migration
psql "$DATABASE_URL" -f db/migrations/001_schema.sql
```

## Notes

- RLS is **not** a filter or soft-delete — it's a hard boundary. A query returns only rows that pass the policy.
- Policies are applied **per table**, not per column, so authenticated users see all columns of all allowed rows.
- If you need column-level masking (e.g., hide emails from non-admins), you'd need a different approach (views, application logic, or additional RLS complexity).
- Admin seed data (dinners, tags) can be inserted directly via SQL (bypassing RLS) or via an admin API endpoint with explicit permission checks.

## What's Next

- mavericks-j4v.3: Migrate static member/dinner data from `src/data/*.ts` into the Neon tables
- mavericks-j4v.6: Create runtime data hooks to query Neon instead of importing static JSON
