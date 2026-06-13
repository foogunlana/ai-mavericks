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
    'inline-flex items-center gap-2 font-sans text-[length:var(--font-size-sm)] font-medium tracking-[1px] uppercase no-underline appearance-none px-[18px] py-2 rounded-[3px] bg-surface border border-border text-text hover:border-text transition-colors cursor-pointer';

  return (
    <div className="font-sans">
      {/* Greeting */}
      <div className="mb-9">
        <span className={eyebrow}>AI Mavericks · Member home</span>
        <h1 className="font-sans font-light text-[2rem] md:text-[2.369rem] leading-[1.15] text-text mt-3 m-0">
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
                  className="w-full aspect-[16/9] object-cover block"
                />
              )}
              <div className="p-6">
                <span className={eyebrow}>
                  {isUpcoming ? 'Next dinner' : 'Latest dinner'}
                </span>
                <h2 className="font-sans font-medium text-[1.333rem] leading-[1.25] text-text mt-2 mb-1">
                  {featured.name}
                </h2>
                <p className="font-sans text-[length:var(--font-size-base)] text-secondary m-0">
                  {formatDate(featured.date)} · {featured.venue}
                </p>
                <div className="mt-5">
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
            <div className="rounded-sm border border-border-light p-6">
              <span className={eyebrow}>Next dinner</span>
              <p className="font-sans text-[length:var(--font-size-base)] text-secondary mt-2 m-0">
                No dinner scheduled yet — watch this space.
              </p>
            </div>
          )}
        </div>

        {/* Right rail — quick links */}
        <aside className="rounded-sm border border-border-light overflow-hidden">
          <div className="px-5 py-4 border-b border-border-light">
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
    'w-full flex items-center justify-between gap-3 px-5 py-4 border-b border-border-light last:border-b-0 hover:bg-surface transition-colors text-left no-underline appearance-none bg-transparent cursor-pointer';
  const inner = (
    <>
      <span className="flex flex-col">
        <span className="font-sans text-[length:var(--font-size-base)] font-medium text-text">
          {title}
        </span>
        <span className="font-sans text-[length:var(--font-size-sm)] text-muted mt-1">
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
