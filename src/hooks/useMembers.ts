import { useState, useEffect } from 'react';
import { useNeon } from '../lib/neon';
import type { Member } from '../types';

interface UseMembersResult {
  members: Member[];
  loading: boolean;
  error: Error | null;
}

function mapRowToMember(row: Record<string, unknown>): Member {
  return {
    name: (row.name as string) ?? '',
    slug: (row.slug as string) ?? '',
    title: (row.title as string) ?? '',
    company: (row.company as string) ?? '',
    bio: (row.bio as string) ?? '',
    photo: (row.photo_url as string) ?? '',
    linkedin: (row.linkedin as string) ?? '',
    twitter: (row.twitter as string) ?? '',
    website: (row.website as string) ?? '',
    tags: (row.tag_ids as string[] | null) ?? [],
    roleType: (row.role_type as string) ?? '',
    dinners: (row.dinner_slugs as string[] | null) ?? [],
  };
}

const MEMBERS_QUERY = `
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
  GROUP BY m.id
  ORDER BY m.name ASC
`;

export function useMembers(): UseMembersResult {
  const { query } = useNeon();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchMembers() {
      setLoading(true);
      setError(null);
      try {
        const results = await query(MEMBERS_QUERY);
        if (cancelled) return;
        const rows: Record<string, unknown>[] = results[0]?.rows ?? [];
        setMembers(rows.map(mapRowToMember));
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error(String(err)));
        setMembers([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchMembers();
    return () => { cancelled = true; };
  }, []);

  return { members, loading, error };
}
