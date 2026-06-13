import type { Dinner } from '../../types';
import type { View } from '../../App';
import { FlashyBtn } from '../FlashyBtn/FlashyBtn';
import { SignInButton } from '../Auth/SignInButton';
import { UserButton } from '../Auth/UserButton';

// Static list of featured companies shown in the marquee.
// Update this list when notable new members join rather than deriving from the
// member database (which would pull gated data into the public bundle).
const COMPANIES = [
  'Always Create',
  'British Airways / Aer Lingus',
  'Channel 4',
  'Delegate (acquired)',
  'ExoBrain',
  'Gitpod',
  'Kiseki Labs',
  'Merantix Capital',
  'Meta',
  'Mindguard',
  'MixedRealityRooms',
  'Response Hub',
  'Roboman',
  'SEEKR',
  'Sano Genetics',
  'StackOne',
  'Stears',
  'Superthread',
  'Talentspace',
  'VodafoneThree',
];

// Company → logo asset in public/images/logos/. `invert` flips white logos so
// they're visible on the white marquee. Companies absent here fall back to text.
const COMPANY_LOGOS: Record<string, { file: string; invert?: boolean }> = {
  'Always Create': { file: 'always-create.webp', invert: true },
  'British Airways / Aer Lingus': { file: 'british-airways.svg' },
  'Channel 4': { file: 'channel-4.svg' },
  'Delegate (acquired)': { file: 'delegate-acquired.svg' },
  'ExoBrain': { file: 'exobrain.svg' },
  'Gitpod': { file: 'ona.svg' },
  'Kiseki Labs': { file: 'kiseki-labs.svg' },
  'Merantix Capital': { file: 'merantix-capital.webp' },
  'Meta': { file: 'meta.svg' },
  'Mindguard': { file: 'mindgard.webp', invert: true },
  'MixedRealityRooms': { file: 'mixedrealityrooms.webp' },
  'Response Hub': { file: 'response-hub.webp' },
  'Roboman': { file: 'roboman.webp' },
  'SEEKR': { file: 'seekr.webp' },
  'Sano Genetics': { file: 'sano-genetics.svg' },
  'StackOne': { file: 'stackone.svg' },
  'Stears': { file: 'stears.webp', invert: true },
  'Superthread': { file: 'superthread.svg' },
  'Talentspace': { file: 'talentspace.svg' },
  'VodafoneThree': { file: 'vodafonethree.svg' },
};

const navLinkClass =
  'appearance-none bg-transparent border-none cursor-pointer no-underline font-sans text-[length:var(--font-size-sm)] font-medium tracking-[2px] uppercase text-secondary hover:text-text transition-colors';

interface LandingHeroProps {
  latestDinner: Dinner | undefined;
  memberCount?: number;
  onViewChange: (view: View) => void;
}

export function LandingHero({ latestDinner, memberCount = COMPANIES.length, onViewChange }: LandingHeroProps) {
  const marqueeItems = [...COMPANIES, ...COMPANIES];
  const photo = latestDinner?.groupPhoto ?? `${import.meta.env.BASE_URL}images/logo.avif`;

  return (
    <div className="bg-background pt-12 min-h-screen flex flex-col">
        {/* Nav — restyled for white background */}
        <nav className="flex items-center justify-between h-16 border-b border-border-light">
          <button
            className="appearance-none bg-transparent border-none cursor-pointer flex items-center"
            onClick={() => onViewChange('home')}
          >
            <img
              src={`${import.meta.env.BASE_URL}images/logo.avif`}
              alt="AI Mavericks"
              className="h-9 w-9 rounded-sm block"
            />
          </button>
          <div className="flex items-center gap-6">
            <button className={navLinkClass} onClick={() => onViewChange('people')}>People</button>
            <button className={navLinkClass} onClick={() => onViewChange('dinners')}>Dinners</button>
            <a
              className={navLinkClass}
              href="https://ai-mavericks-ldn.beehiiv.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Newsletter
            </a>
            <SignInButton />
            <UserButton />
          </div>
        </nav>

        {/* Two-column content */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-9">
          <div className="flex flex-col items-start gap-5">
            <span className="font-sans text-[length:var(--font-size-sm)] font-medium tracking-[2px] uppercase text-muted">
              London · Quarterly dinners
            </span>
            <h1 className="font-sans font-light text-[2.5rem] md:text-[3.25rem] leading-[1.1] text-text m-0">
              AI Mavericks
            </h1>
            <div className="flex flex-col gap-3 max-w-[460px]">
              <p className="font-sans font-normal text-[1.0625rem] leading-[1.55] text-secondary m-0">
                AI Mavericks brings together the people actually building with AI in London —
                founders, engineers, and operators — for intimate dinners where the conversation
                goes deeper than the demo.
              </p>
              <p className="font-sans font-normal text-[1.0625rem] leading-[1.55] text-secondary m-0">
                No panels, no pitches. Just one table and the people shaping what comes next.
              </p>
            </div>
            <FlashyBtn>Apply to Join</FlashyBtn>
            <p className="flex items-center gap-2 font-sans text-[length:var(--font-size-base)] text-secondary m-0">
              <span className="font-semibold text-[length:var(--font-size-md)] text-text">{memberCount}+</span>
              builders and counting
            </p>
          </div>

          <div className="flex">
            <img
              src={photo}
              alt={latestDinner ? `AI Mavericks dinner — ${latestDinner.name}` : 'AI Mavericks'}
              className="w-full aspect-[4/3] object-cover rounded-sm block shadow-[0_4px_12px_rgba(0,0,0,0.10)]"
            />
          </div>
        </div>

        {/* Company marquee — bottom band, pinned inside the full-height hero.
            py uses the important modifier + design token because theme.css's
            unlayered `* { padding: 0 }` reset otherwise nullifies Tailwind padding. */}
        <div className="border-t border-border-light py-[var(--space-9)]! overflow-hidden flex items-center gap-14">
          <p className="font-sans text-[length:var(--font-size-sm)] font-medium tracking-[2px] uppercase text-muted shrink-0">
            Our {memberCount}+ members work at
          </p>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
            <div className="flex w-max items-center gap-14 animate-[marquee-scroll_60s_linear_infinite]">
              {marqueeItems.map((company, i) => {
                const logo = COMPANY_LOGOS[company];
                return logo ? (
                  <img
                    key={i}
                    src={`${import.meta.env.BASE_URL}images/logos/${logo.file}`}
                    alt={company}
                    className={`h-7 w-auto object-contain grayscale opacity-70 ${logo.invert ? 'invert' : ''}`}
                  />
                ) : (
                  <span
                    key={i}
                    className="font-sans text-[1.125rem] font-medium whitespace-nowrap text-muted tracking-[0.5px] grayscale"
                  >
                    {company}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
    </div>
  );
}
