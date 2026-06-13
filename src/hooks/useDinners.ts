import { useState, useEffect } from 'react';
import { useNeon } from '../lib/neon';
import type { Dinner, Topic } from '../types';

interface UseDinnersResult {
  dinners: Dinner[];
  loading: boolean;
  error: Error | null;
}

function deriveName(slug: string, date: string): string {
  if (!date) return slug;
  const d = new Date(date);
  if (isNaN(d.getTime())) return slug;
  return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) + ' Dinner';
}

function mapRowToDinner(row: Record<string, unknown>): Dinner {
  const slug = (row.slug as string) ?? '';
  const date = (row.date as string) ?? '';
  return {
    name: deriveName(slug, date),
    slug,
    date,
    venue: (row.venue as string) ?? '',
    groupPhoto: (row.group_photo_url as string | null) ?? null,
    description: (row.description as string) ?? '',
    topics: (row.topics as Topic[] | null) ?? [],
    attendees: (row.attendee_slugs as string[] | null) ?? [],
    beehiivUrl: (row.beehiiv_url as string) ?? '',
    discordUrl: (row.discord_url as string) ?? '',
    lumaUrl: (row.luma_url as string) ?? '',
  };
}

const DINNERS_QUERY = `
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
  GROUP BY d.id
  ORDER BY d.date DESC
`;

export function useDinners(): UseDinnersResult {
  const { query } = useNeon();
  const [dinners, setDinners] = useState<Dinner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchDinners() {
      setLoading(true);
      setError(null);
      try {
        const results = await query(DINNERS_QUERY);
        if (cancelled) return;
        const rows: Record<string, unknown>[] = results[0]?.rows ?? [];
        setDinners(rows.map(mapRowToDinner));
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error(String(err)));
        setDinners([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchDinners();
    return () => { cancelled = true; };
  }, []);

  return { dinners, loading, error };
}
