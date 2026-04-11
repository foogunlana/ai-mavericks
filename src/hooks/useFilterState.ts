import { useState, useCallback, useMemo } from 'react';
import type { Member } from '../types';
import { dinners } from '../data/dinners';

export interface FilterState {
  roles: string[];
  interests: string[];
  dinnerSlugs: string[];
}

function parseFiltersFromUrl(): FilterState {
  const params = new URLSearchParams(window.location.search);
  return {
    roles: params.get('roles')?.split(',').filter(Boolean) ?? [],
    interests: params.get('interests')?.split(',').filter(Boolean) ?? [],
    dinnerSlugs: params.get('dinners')?.split(',').filter(Boolean) ?? [],
  };
}

function syncFiltersToUrl(filters: FilterState) {
  const params = new URLSearchParams();
  if (filters.roles.length) params.set('roles', filters.roles.join(','));
  if (filters.interests.length) params.set('interests', filters.interests.join(','));
  if (filters.dinnerSlugs.length) params.set('dinners', filters.dinnerSlugs.join(','));
  const qs = params.toString();
  const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
  window.history.replaceState(null, '', url);
}

export function useFilterState() {
  const [filters, setFiltersRaw] = useState<FilterState>(parseFiltersFromUrl);

  const setFilters = useCallback((next: FilterState) => {
    setFiltersRaw(next);
    syncFiltersToUrl(next);
  }, []);

  const toggleFilter = useCallback(
    (dimension: keyof FilterState, value: string) => {
      setFilters({
        ...filters,
        [dimension]: filters[dimension].includes(value)
          ? filters[dimension].filter((v) => v !== value)
          : [...filters[dimension], value],
      });
    },
    [filters, setFilters],
  );

  const clearFilters = useCallback(() => {
    setFilters({ roles: [], interests: [], dinnerSlugs: [] });
  }, [setFilters]);

  const hasActiveFilters =
    filters.roles.length > 0 ||
    filters.interests.length > 0 ||
    filters.dinnerSlugs.length > 0;

  const filterMembers = useCallback(
    (members: Member[]): Member[] => {
      return members.filter((m) => {
        if (filters.roles.length && !filters.roles.includes(m.roleType)) return false;
        if (filters.interests.length && !filters.interests.some((t) => m.tags.includes(t))) return false;
        if (filters.dinnerSlugs.length && !filters.dinnerSlugs.some((d) => m.dinners.includes(d))) return false;
        return true;
      });
    },
    [filters],
  );

  const dinnerOptions = useMemo(
    () => dinners.map((d) => ({ slug: d.slug, label: d.name })),
    [],
  );

  return { filters, toggleFilter, clearFilters, hasActiveFilters, filterMembers, dinnerOptions };
}
