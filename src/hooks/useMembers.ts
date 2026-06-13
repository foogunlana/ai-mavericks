import { useState, useEffect } from 'react';
import { useNeon } from '../lib/neon';
import type { Member } from '../types';

interface UseMembersResult {
  members: Member[];
  loading: boolean;
  error: Error | null;
}

// Photo paths are stored as site-root paths (e.g. /images/...); prefix BASE_URL
// so they resolve under the app's base path, matching src/data/members.ts.
const BASE = import.meta.env.BASE_URL;
function resolvePhoto(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE}${clean}`;
}

function mapRowToMember(row: Record<string, unknown>): Member {
  return {
    name: (row.name as string) ?? '',
    slug: (row.slug as string) ?? '',
    title: (row.title as string) ?? '',
    company: (row.company as string) ?? '',
    bio: (row.bio as string) ?? '',
    photo: resolvePhoto(row.photo_url as string | null),
    linkedin: (row.linkedin as string) ?? '',
    twitter: (row.twitter as string) ?? '',
    website: (row.website as string) ?? '',
    tags: (row.tag_ids as string[] | null) ?? [],
    roleType: (row.role_type as string) ?? '',
    dinners: (row.dinner_slugs as string[] | null) ?? [],
  };
}

export function useMembers(): UseMembersResult {
  const { select } = useNeon();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchMembers() {
      setLoading(true);
      setError(null);
      try {
        const rows = await select<Record<string, unknown>>('members_view', 'select=*&order=name.asc');
        if (cancelled) return;
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
