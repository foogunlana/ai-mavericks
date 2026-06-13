// Public objection-handling section shown below the hero on the landing page (mavericks-ik8).
// PLACEHOLDER CONTENT: the testimonial quotes are drafted and the photos are stock (Unsplash);
// real testimonials + the member-PII / public-bundle decision are tracked as a follow-up before launch.
// NOTE: padding/margin utilities use the `!` important modifier because theme.css's unlayered
// `* { padding: 0; margin: 0 }` reset otherwise nullifies them (same workaround as LandingHero's marquee).

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  photo: string;
  theme: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I've been to a hundred AI meetups. This is the only one where the conversation gets past the demo and into what's actually breaking in production.",
    name: 'Bode Ogunlana', role: 'CTO', company: 'Stears', theme: 'The conversation',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop&crop=face',
  },
  {
    quote:
      'Everyone at the table is actually shipping. No tourists, no one selling you something — just builders comparing notes on the same hard problems.',
    name: 'Christina Banjo', role: 'Founder', company: 'Always Create', theme: "Who's in the room",
    photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&h=800&fit=crop&crop=face',
  },
  {
    quote:
      "I left my first dinner with two intros that turned into real collaborations. That just doesn’t happen on a conference floor.",
    name: 'Elias Nema', role: 'Engineering Manager', company: 'Meta', theme: 'The payoff',
    photo: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?w=600&h=800&fit=crop&crop=face',
  },
];

const OBJECTION_ANSWERS: { question: string; answer: string }[] = [
  {
    question: "Isn't this just another networking event?",
    answer: 'No badges, no elevator pitches, no one working the room. Just one table and a real conversation that goes past the demo.',
  },
  {
    question: 'Will I actually fit in?',
    answer: "If you’re building with AI, you belong here. Founders, engineers, operators — the one thing everyone shares is that they ship.",
  },
  {
    question: "I'm busy — is it worth the evening?",
    answer: "One evening a quarter. People leave with intros that turn into collaborations, and answers they couldn't get anywhere else.",
  },
];

const eyebrow = 'font-sans text-[length:var(--font-size-sm)] font-medium tracking-[2px] uppercase text-muted m-0';
const heading = 'font-sans font-light text-[1.75rem] md:text-[2.125rem] leading-[1.15] text-text m-0';
const intro = 'font-sans font-normal text-[1.0625rem] leading-[1.55] text-secondary m-0 max-w-[560px]';

export function ObjectionSection() {
  return (
    <section>
      {/* Part 1 — direct objection-handling text, vertically stacked */}
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

      {/* Part 2 — vertically separated; testimonial grid */}
      <div className="border-t border-border-light py-12!">
        <div className="flex flex-col gap-4 mb-8! max-w-[620px]">
          <p className={eyebrow}>From the table</p>
          <h2 className={heading}>What members actually say</h2>
          <p className={intro}>
            No panels, no pitches. Here&rsquo;s what people who keep coming back tell us about the
            conversation, the room, and why it&rsquo;s worth the evening.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col gap-6 rounded-sm bg-background border border-border-light p-7! shadow-[0_4px_12px_rgba(0,0,0,0.10)] m-0"
            >
              <p className={eyebrow}>{t.theme}</p>
              <blockquote className="font-sans font-light text-[1.1875rem] leading-[1.5] text-text m-0 flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 mt-auto!">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="h-[48px] w-[48px] rounded-sm object-cover object-top grayscale shrink-0"
                  loading="lazy"
                />
                <div className="flex flex-col">
                  <span className="font-sans font-medium text-[length:var(--font-size-base)] text-text leading-tight">
                    {t.name}
                  </span>
                  <span className="font-sans text-[length:var(--font-size-sm)] tracking-[0.5px] uppercase text-muted leading-tight mt-1!">
                    {t.role}{t.company ? ` · ${t.company}` : ''}
                  </span>
                </div>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
