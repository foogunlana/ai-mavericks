/**
 * seed-neon.ts
 *
 * Seeds the Neon Postgres database from the content/*.json source files.
 * Reads members, dinners, and tags then upserts them in FK-safe order:
 *   1. tags
 *   2. members (email/clerk_user_id left NULL — filled in at login time)
 *   3. member_tags
 *   4. dinners
 *   5. dinner_attendees
 *
 * Usage:
 *   DATABASE_URL=postgresql://... npx tsx scripts/seed-neon.ts
 *   (or) npm run seed   (after adding DATABASE_URL to .env.local)
 *
 * Requires migration 002_email_nullable.sql to have been applied first.
 */

import { neon } from '@neondatabase/serverless';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// ── Env guard ─────────────────────────────────────────────────────────────

if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL is not set.\n' +
      'Copy .env.example to .env.local and fill in the Neon direct connection string:\n' +
      '  DATABASE_URL=postgresql://user:password@hostname/dbname',
  );
}

const sql = neon(process.env.DATABASE_URL);

// ── Path helpers ──────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, '..', 'content');
const MEMBERS_DIR = join(CONTENT_DIR, 'members');
const DINNERS_DIR = join(CONTENT_DIR, 'dinners');
const TAGS_FILE = join(CONTENT_DIR, 'tags', 'tags.json');

// ── Type definitions ──────────────────────────────────────────────────────

interface MemberFile {
  name: string;
  slug: string;
  title?: string;
  company?: string;
  bio?: string;
  photo?: string;
  isStockPhoto?: boolean;
  linkedin?: string;
  twitter?: string;
  website?: string;
  tags?: string[];
  roleType?: string;
  dinners?: string[];
}

interface DinnerFile {
  name: string;
  slug: string;
  date: string;
  venue?: string;
  groupPhoto?: string;
  description?: string;
  topics?: Array<{ text: string; attribution: string; links: string[] }>;
  attendees?: string[];
  beehiivUrl?: string;
  discordUrl?: string;
  lumaUrl?: string;
}

interface TagEntry {
  id: string;
  label: string;
  category: string;
}

interface TagsFile {
  tags: TagEntry[];
}

// ── Loaders ───────────────────────────────────────────────────────────────

function loadMembers(): MemberFile[] {
  const files = readdirSync(MEMBERS_DIR).filter((f) => f.endsWith('.json'));
  return files.map((file) => {
    const raw = readFileSync(join(MEMBERS_DIR, file), 'utf-8');
    return JSON.parse(raw) as MemberFile;
  });
}

function loadDinners(): DinnerFile[] {
  const files = readdirSync(DINNERS_DIR).filter((f) => f.endsWith('.json'));
  return files.map((file) => {
    const raw = readFileSync(join(DINNERS_DIR, file), 'utf-8');
    return JSON.parse(raw) as DinnerFile;
  });
}

function loadTags(): TagEntry[] {
  const raw = readFileSync(TAGS_FILE, 'utf-8');
  return (JSON.parse(raw) as TagsFile).tags;
}

// ── Seed functions ────────────────────────────────────────────────────────

async function seedTags(tags: TagEntry[]): Promise<void> {
  console.log(`Seeding ${tags.length} tags…`);
  for (const tag of tags) {
    await sql`
      INSERT INTO tags (id, label, category)
      VALUES (${tag.id}::uuid, ${tag.label}, ${tag.category})
      ON CONFLICT (id) DO UPDATE
        SET label    = EXCLUDED.label,
            category = EXCLUDED.category
    `;
  }
}

async function seedMembers(members: MemberFile[]): Promise<void> {
  console.log(`Seeding ${members.length} members…`);
  for (const m of members) {
    await sql`
      INSERT INTO members (
        clerk_user_id,
        email,
        name,
        slug,
        title,
        company,
        bio,
        photo_url,
        linkedin,
        twitter,
        website,
        role_type,
        updated_at
      )
      VALUES (
        NULL,
        NULL,
        ${m.name},
        ${m.slug},
        ${m.title ?? null},
        ${m.company ?? null},
        ${m.bio ?? null},
        ${m.photo ?? null},
        ${m.linkedin ?? null},
        ${m.twitter ?? null},
        ${m.website ?? null},
        ${m.roleType ?? 'member'},
        NOW()
      )
      ON CONFLICT (slug) DO UPDATE
        SET name       = EXCLUDED.name,
            title      = EXCLUDED.title,
            company    = EXCLUDED.company,
            bio        = EXCLUDED.bio,
            photo_url  = EXCLUDED.photo_url,
            linkedin   = EXCLUDED.linkedin,
            twitter    = EXCLUDED.twitter,
            website    = EXCLUDED.website,
            role_type  = EXCLUDED.role_type,
            updated_at = NOW()
    `;
  }
}

async function seedMemberTags(members: MemberFile[]): Promise<void> {
  // Build a slug→id map to avoid repeated lookups
  const rows = await sql<{ slug: string; id: string }[]>`
    SELECT slug, id FROM members
  `;
  const memberIdBySlug = new Map(rows.map((r) => [r.slug, r.id]));

  // Build a label→id map for tags (tags.json uses short string labels, not UUIDs)
  const tagRows = await sql<{ label: string; id: string }[]>`
    SELECT label, id FROM tags
  `;
  const tagIdByLabel = new Map(
    tagRows.map((r) => [r.label.toLowerCase(), r.id]),
  );

  let linkCount = 0;
  for (const m of members) {
    const memberId = memberIdBySlug.get(m.slug);
    if (!memberId) {
      console.warn(`  Warning: no DB row found for member slug "${m.slug}"`);
      continue;
    }

    for (const rawTag of m.tags ?? []) {
      // tags in member files are lowercase short ids like "fintech", "llms"
      // The tags table stores them as labels like "FinTech", "LLMs".
      // First try matching by id (UUID), then by lowercased label.
      let tagId: string | undefined;

      // Try direct UUID match (unlikely but safe)
      const directRows = await sql<{ id: string }[]>`
        SELECT id FROM tags WHERE id::text = ${rawTag}
      `;
      if (directRows.length > 0) {
        tagId = directRows[0].id;
      } else {
        // Match by the tag's own id field (stored as label in DB) or by label
        const idMatchRows = await sql<{ id: string }[]>`
          SELECT id FROM tags WHERE lower(label) = lower(${rawTag})
        `;
        if (idMatchRows.length > 0) {
          tagId = idMatchRows[0].id;
        } else {
          // Fall back to map lookup
          tagId = tagIdByLabel.get(rawTag.toLowerCase());
        }
      }

      if (!tagId) {
        console.warn(
          `  Warning: tag "${rawTag}" for member "${m.slug}" not found in tags table — skipping`,
        );
        continue;
      }

      await sql`
        INSERT INTO member_tags (member_id, tag_id)
        VALUES (${memberId}::uuid, ${tagId}::uuid)
        ON CONFLICT DO NOTHING
      `;
      linkCount++;
    }
  }
  console.log(`  Created/verified ${linkCount} member-tag links`);
}

async function seedDinners(dinners: DinnerFile[]): Promise<void> {
  console.log(`Seeding ${dinners.length} dinners…`);
  for (const d of dinners) {
    const topicsJson = JSON.stringify(d.topics ?? []);
    await sql`
      INSERT INTO dinners (
        slug,
        date,
        venue,
        group_photo_url,
        description,
        topics,
        beehiiv_url,
        discord_url,
        luma_url,
        updated_at
      )
      VALUES (
        ${d.slug},
        ${d.date}::timestamptz,
        ${d.venue ?? null},
        ${d.groupPhoto ?? null},
        ${d.description ?? null},
        ${topicsJson}::jsonb,
        ${d.beehiivUrl || null},
        ${d.discordUrl || null},
        ${d.lumaUrl || null},
        NOW()
      )
      ON CONFLICT (slug) DO UPDATE
        SET date            = EXCLUDED.date,
            venue           = EXCLUDED.venue,
            group_photo_url = EXCLUDED.group_photo_url,
            description     = EXCLUDED.description,
            topics          = EXCLUDED.topics,
            beehiiv_url     = EXCLUDED.beehiiv_url,
            discord_url     = EXCLUDED.discord_url,
            luma_url        = EXCLUDED.luma_url,
            updated_at      = NOW()
    `;
  }
}

async function seedDinnerAttendees(dinners: DinnerFile[]): Promise<void> {
  // Build lookup maps
  const dinnerRows = await sql<{ slug: string; id: string }[]>`
    SELECT slug, id FROM dinners
  `;
  const dinnerIdBySlug = new Map(dinnerRows.map((r) => [r.slug, r.id]));

  const memberRows = await sql<{ slug: string; id: string }[]>`
    SELECT slug, id FROM members
  `;
  const memberIdBySlug = new Map(memberRows.map((r) => [r.slug, r.id]));

  let linkCount = 0;
  for (const d of dinners) {
    const dinnerId = dinnerIdBySlug.get(d.slug);
    if (!dinnerId) {
      console.warn(`  Warning: no DB row found for dinner slug "${d.slug}"`);
      continue;
    }

    for (const memberSlug of d.attendees ?? []) {
      const memberId = memberIdBySlug.get(memberSlug);
      if (!memberId) {
        console.warn(
          `  Warning: attendee slug "${memberSlug}" in dinner "${d.slug}" not found in members table — skipping`,
        );
        continue;
      }

      await sql`
        INSERT INTO dinner_attendees (dinner_id, member_id, role)
        VALUES (${dinnerId}::uuid, ${memberId}::uuid, 'attendee')
        ON CONFLICT DO NOTHING
      `;
      linkCount++;
    }
  }
  console.log(`  Created/verified ${linkCount} dinner-attendee links`);
}

// ── Verify row counts ─────────────────────────────────────────────────────

async function verifyRowCounts(
  expectedMembers: number,
  expectedDinners: number,
  expectedTags: number,
): Promise<void> {
  console.log('\nVerification — row counts:');

  const [{ count: memberCount }] = await sql<{ count: string }[]>`
    SELECT count(*)::text FROM members
  `;
  const [{ count: dinnerCount }] = await sql<{ count: string }[]>`
    SELECT count(*)::text FROM dinners
  `;
  const [{ count: tagCount }] = await sql<{ count: string }[]>`
    SELECT count(*)::text FROM tags
  `;
  const [{ count: memberTagCount }] = await sql<{ count: string }[]>`
    SELECT count(*)::text FROM member_tags
  `;
  const [{ count: attendeeCount }] = await sql<{ count: string }[]>`
    SELECT count(*)::text FROM dinner_attendees
  `;

  const membersOk = parseInt(memberCount) === expectedMembers ? '✓' : '✗';
  const dinnersOk = parseInt(dinnerCount) === expectedDinners ? '✓' : '✗';
  const tagsOk = parseInt(tagCount) === expectedTags ? '✓' : '✗';

  console.log(
    `  members:          ${memberCount.padStart(4)} / ${expectedMembers} expected  ${membersOk}`,
  );
  console.log(
    `  dinners:          ${dinnerCount.padStart(4)} / ${expectedDinners} expected  ${dinnersOk}`,
  );
  console.log(
    `  tags:             ${tagCount.padStart(4)} / ${expectedTags} expected  ${tagsOk}`,
  );
  console.log(`  member_tags:      ${memberTagCount.padStart(4)}`);
  console.log(`  dinner_attendees: ${attendeeCount.padStart(4)}`);
}

// ── Main ──────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log('Loading content files…');
  const tags = loadTags();
  const members = loadMembers();
  const dinners = loadDinners();

  console.log(
    `  Found: ${tags.length} tags, ${members.length} members, ${dinners.length} dinners\n`,
  );

  await seedTags(tags);
  await seedMembers(members);
  await seedMemberTags(members);
  await seedDinners(dinners);
  await seedDinnerAttendees(dinners);

  await verifyRowCounts(members.length, dinners.length, tags.length);

  console.log('\nSeed complete.');
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
