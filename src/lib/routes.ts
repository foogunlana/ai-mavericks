export type View = 'home' | 'people' | 'dinners' | 'styleguide';

/** Map a logical view to its URL path (basename-relative). */
export function viewToPath(view: View): string {
  switch (view) {
    case 'home': return '/';
    case 'people': return '/people';
    case 'dinners': return '/dinners';
    case 'styleguide': return '/styleguide';
  }
}

/** Derive the logical view from a basename-relative pathname. */
export function pathToView(pathname: string): View {
  if (pathname.startsWith('/people')) return 'people';
  if (pathname.startsWith('/dinners')) return 'dinners'; // covers /dinners/:slug
  if (pathname.startsWith('/styleguide')) return 'styleguide';
  return 'home';
}
