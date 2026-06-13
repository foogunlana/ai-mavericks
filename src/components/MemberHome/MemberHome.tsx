import type { Dinner } from '../../types';
import type { View } from '../../App';

interface MemberHomeProps {
  dinners: Dinner[];
  memberCount?: number;
  firstName?: string;
  onViewChange: (view: View) => void;
  onSelectDinner: (slug: string) => void;
}

const eyebrow =
  'font-sans text-[length:var(--font-size-sm)] font-medium tracking-[2px] uppercase text-muted';

// NOTE on spacing: theme.css ships an unlayered `* { margin:0; padding:0 }`
// reset that overrides Tailwind's (layered) margin/padding utilities. So we use
// flex/grid `gap-*` for rhythm (unaffected by the reset) and the `!important`
// modifier (`p-6!`) wherever real box padding is unavoidable.

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function MemberHome({
  dinners,
  memberCount,
  firstName,
  onViewChange,
  onSelectDinner,
}: MemberHomeProps) {
  // Smart "next dinner": prefer the soonest upcoming dinner; otherwise fall
  // back to the most recent past dinner (dinners are sorted newest-first).
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming = dinners
    .filter((d) => new Date(d.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const featured = upcoming[0] ?? dinners[0];
  const isUpcoming = Boolean(upcoming[0]);

  // Latest newsletter = most recent dinner that has a beehiiv recap.
  const newsletterDinner = dinners.find((d) => d.beehiivUrl);
  const newsletterUrl =
    newsletterDinner?.beehiivUrl || 'https://ai-mavericks-ldn.beehiiv.com';
  const newsletterTitle = newsletterDinner
    ? `${newsletterDinner.name} recap`
    : 'Latest from AI Mavericks';

  const greetingName = firstName?.trim();
  const greeting = greetingName ? `Welcome back, ${greetingName}` : 'Welcome back';

  const ctaClass =
    'inline-flex items-center gap-2 font-sans text-[length:var(--font-size-sm)] font-medium tracking-[1px] uppercase no-underline appearance-none px-[18px]! py-2! rounded-[3px] bg-surface border border-border text-text hover:border-text transition-colors cursor-pointer';

  return (
    <div className="font-sans flex flex-col gap-9">
      {/* Greeting */}
      <div className="flex flex-col gap-2">
        <span className={eyebrow}>AI Mavericks · Member home</span>
        <h1 className="font-sans font-light text-[2rem] md:text-[2.369rem] leading-[1.15] text-text">
          {greeting}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
        {/* Main column — featured dinner */}
        <div>
          {featured ? (
            <div className="rounded-sm overflow-hidden border border-border-light">
              {featured.groupPhoto && (
                <img
                  src={featured.groupPhoto}
                  alt={featured.name}
                  className="w-full aspect-[16/9] max-h-[400px] object-cover block"
                />
              )}
              <div className="p-6! flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <span className={eyebrow}>
                    {isUpcoming ? 'Next dinner' : 'Latest dinner'}
                  </span>
                  <h2 className="font-sans font-medium text-[1.333rem] leading-[1.25] text-text">
                    {featured.name}
                  </h2>
                  <p className="font-sans text-[length:var(--font-size-base)] text-secondary">
                    {formatDate(featured.date)} · {featured.venue}
                  </p>
                </div>
                <div>
                  {isUpcoming && featured.lumaUrl ? (
                    <a
                      href={featured.lumaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={ctaClass}
                    >
                      RSVP
                    </a>
                  ) : (
                    <button
                      onClick={() => onSelectDinner(featured.slug)}
                      className={ctaClass}
                    >
                      See details
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-sm border border-border-light p-6! flex flex-col gap-2">
              <span className={eyebrow}>Next dinner</span>
              <p className="font-sans text-[length:var(--font-size-base)] text-secondary">
                No dinner scheduled yet — watch this space.
              </p>
            </div>
          )}
        </div>

        {/* Right rail — quick links */}
        <aside className="rounded-sm border border-border-light overflow-hidden">
          <div className="px-5! py-4! border-b border-border-light">
            <span className={eyebrow}>Quick links</span>
          </div>
          <QuickLink
            title="Latest newsletter"
            sublabel={newsletterTitle}
            href={newsletterUrl}
          />
          <QuickLink
            title="All dinners"
            sublabel="Browse every dinner"
            onClick={() => onViewChange('dinners')}
          />
          <QuickLink
            title="Meet the members"
            sublabel={memberCount ? `${memberCount} builders` : 'Browse the community'}
            onClick={() => onViewChange('people')}
          />
        </aside>
      </div>
    </div>
  );
}

interface QuickLinkProps {
  title: string;
  sublabel: string;
  href?: string;
  onClick?: () => void;
}

function QuickLink({ title, sublabel, href, onClick }: QuickLinkProps) {
  const cls =
    'w-full flex items-center justify-between gap-3 px-5! py-4! border-b border-border-light last:border-b-0 hover:bg-surface transition-colors text-left no-underline appearance-none bg-transparent cursor-pointer';
  const inner = (
    <>
      <span className="flex flex-col gap-1">
        <span className="font-sans text-[length:var(--font-size-base)] font-medium text-text">
          {title}
        </span>
        <span className="font-sans text-[length:var(--font-size-sm)] text-muted">
          {sublabel}
        </span>
      </span>
      <span className="font-sans text-[length:var(--font-size-md)] text-muted">→</span>
    </>
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
