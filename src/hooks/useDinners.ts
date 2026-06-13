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

export function useDinners(): UseDinnersResult {
  const { select } = useNeon();
  const [dinners, setDinners] = useState<Dinner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchDinners() {
      setLoading(true);
      setError(null);
      try {
        const rows = await select<Record<string, unknown>>('dinners_view', 'select=*&order=date.desc');
        if (cancelled) return;
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
