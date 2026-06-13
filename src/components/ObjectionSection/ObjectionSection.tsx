// Public objection-handling section shown below the hero on the landing page (mavericks-ik8).
// Three vertically-stacked parts: direct objection Q&A → topics discussed (tag chips) →
// member testimonials (featured + supporting). Covers the bead's three pillars
// (topics / who attends / benefits) and handles prospective-member objections.
//
// Testimonials are ANONYMIZED — quote + generic role only, no names/faces/companies, so no
// gated member data reaches the public bundle. Quotes are PLACEHOLDER (drafted); real quotes
// are tracked in mavericks-jfz.
//
// NOTE: padding/margin utilities use the `!` important modifier because theme.css's unlayered
// `* { padding: 0; margin: 0 }` reset otherwise nullifies them (same workaround as LandingHero).
// The section sits inside `.app`, which supplies max-width + horizontal padding, so parts only
// manage their own vertical rhythm.

interface Testimonial {
  theme: string; // which objection this quote answers
  role: string; // generic, non-identifying attribution
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    theme: 'The conversation',
    role: 'CTO',
    quote:
      "I've been to a hundred AI meetups. This is the only one where the conversation gets past the demo and into what's actually breaking in production.",
  },
  {
    theme: "Who's in the room",
    role: 'Founder',
    quote:
      'Everyone at the table is actually shipping. No tourists, no one selling you something — just builders comparing notes on the same hard problems.',
  },
  {
    theme: 'The payoff',
    role: 'Engineering manager',
    quote:
      'I left my first dinner with two intros that turned into real collaborations. That just doesn’t happen on a conference floor.',
  },
];

const OBJECTION_ANSWERS: { question: string; answer: string }[] = [
  {
    question: "Isn't this just another networking event?",
    answer:
      'No badges, no elevator pitches, no one working the room. Just one table and a real conversation that goes past the demo.',
  },
  {
    question: 'Will I actually fit in?',
    answer:
      'If you’re building with AI, you belong here. Founders, engineers, operators — the one thing everyone shares is that they ship.',
  },
  {
    question: 'I’m busy — is it worth the evening?',
    answer:
      'One evening a quarter. People leave with intros that turn into collaborations, and answers they couldn’t get anywhere else.',
  },
];

const TOPICS: string[] = [
  'Prototype → production',
  'Evals & reliability',
  'Build vs. buy',
  'Hiring AI teams',
  'Fundraising & GTM',
  'Infrastructure',
];

const eyebrow = 'font-sans text-[length:var(--font-size-sm)] font-medium tracking-[2px] uppercase text-muted m-0';
const headingClass = 'font-sans font-light text-[1.75rem] md:text-[2.125rem] leading-[1.15] text-text m-0';
const intro = 'font-sans font-normal text-[1.0625rem] leading-[1.55] text-secondary m-0 max-w-[560px]';
const roleLine = 'font-sans text-[length:var(--font-size-sm)] tracking-[1px] uppercase text-muted m-0 mt-auto!';

export function ObjectionSection() {
  const [feature, ...supporting] = TESTIMONIALS;

  return (
    <section>
      {/* Part 1 — direct objection-handling text */}
      <div className="py-12!">
        <div className="flex flex-col gap-4 mb-8! max-w-[620px]">
          <p className={eyebrow}>Before you apply</p>
        </div>
        <div className="flex flex-col">
          {OBJECTION_ANSWERS.map((a) => (
            <div key={a.question} className="py-8! border-b border-border-light first:pt-0! last:border-b-0">
              <p className="font-sans font-normal text-[1.333rem] leading-[1.3] text-text m-0">
                {a.question}
              </p>
              <p className="font-sans font-normal text-[1.0625rem] leading-[1.55] text-secondary m-0 mt-3! max-w-[640px]">
                {a.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2 — topics discussed (tag chips) */}
      <div className="border-t border-border-light py-12!">
        <div className="flex flex-col gap-4 mb-8! max-w-[620px]">
          <p className={eyebrow}>At the table</p>
          <h2 className={headingClass}>What we actually talk about</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {TOPICS.map((topic) => (
            <span
              key={topic}
              className="inline-flex border border-border-light rounded-[3px] px-[14px]! py-[6px]! font-sans text-[length:var(--font-size-sm)] tracking-[1px] uppercase text-secondary"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Part 3 — testimonials (featured + supporting) */}
      <div className="border-t border-border-light py-12!">
        <div className="flex flex-col gap-4 mb-8! max-w-[620px]">
          <p className={eyebrow}>From the table</p>
          <h2 className={headingClass}>What members actually say</h2>
          <p className={intro}>
            No panels, no pitches. Here&rsquo;s what people who keep coming back tell us about the
            conversation, the room, and why it&rsquo;s worth the evening.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Featured */}
          <figure className="md:col-span-2 flex flex-col gap-4 bg-surface rounded-sm p-7! m-0">
            <p className={eyebrow}>{feature.theme}</p>
            <blockquote className="font-sans font-light text-[1.5rem] leading-[1.4] text-text m-0 flex-1">
              &ldquo;{feature.quote}&rdquo;
            </blockquote>
            <p className={roleLine}>— {feature.role}</p>
          </figure>
          {/* Supporting stack */}
          <div className="flex flex-col gap-4">
            {supporting.map((t) => (
              <figure key={t.role} className="flex flex-col gap-2 border-b border-border-light pb-4! last:border-b-0 m-0">
                <p className={eyebrow}>{t.theme}</p>
                <blockquote className="font-sans font-normal text-[0.9375rem] leading-[1.5] text-secondary m-0">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <p className="font-sans text-[length:var(--font-size-sm)] tracking-[1px] uppercase text-muted m-0">
                  — {t.role}
                </p>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
