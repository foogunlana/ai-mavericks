// DEV-ONLY module — imported only via a DEV-gated lazy() in App.tsx.
// Because App.tsx wraps this import in `import.meta.env.DEV ? lazy(...) : null`,
// Vite's production build dead-code-eliminates this entire module (and
// transitively the data/members + data/dinners static glob imports) from the
// production bundle.

import { members as staticMembers } from './data/members';
import { dinners as staticDinners } from './data/dinners';
import { AppViews } from './components/AppViews';
import type { ContentProps } from './components/AppViews';

export default function StaticContent({ heroSentinelRef }: ContentProps) {
  return (
    <AppViews
      heroSentinelRef={heroSentinelRef}
      members={staticMembers} dinners={staticDinners}
      membersLoading={false} dinnersLoading={false}
      gated={false}
    />
  );
}
