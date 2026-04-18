export function StyleGuide() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 font-sans text-primary-900">
      <header className="mb-16">
        <h1 className="font-serif text-5xl leading-tight tracking-tight text-primary-950 mb-3">
          Style Guide
        </h1>
        <p className="text-md text-warm-600 leading-relaxed max-w-2xl">
          AI Mavericks design system tokens. All colours, typography, spacing, radii, shadows, and
          breakpoints defined in one place.
        </p>
      </header>

      {/* ── Font Comparison ── */}
      <Section title="Font Comparison">
        <p className="text-warm-600 mb-8">
          Three directions for the Mavericks typeface. Same content, different personality.
        </p>

        <div className="space-y-10">
          {/* Weight + Line-height combinations */}
          <WeightLineHeightOption
            number={1}
            label="Medium & Balanced (baseline)"
            vibe="Option 3 from before with smaller/tighter small text, more element spacing"
            levels={{
              heading:    { weight: 500, lineHeight: 1.15 },
              subheading: { weight: 500, lineHeight: 1.25 },
              body:       { weight: 400, lineHeight: 1.6 },
              small:      { weight: 500, lineHeight: 1.2, size: 0.688 },
              caption:    { weight: 500, lineHeight: 1.1, size: 0.5 },
            }}
          />

          <WeightLineHeightOption
            number={2}
            label="Medium heads, lighter body"
            vibe="Same but 300 body weight for more elegance"
            levels={{
              heading:    { weight: 500, lineHeight: 1.15 },
              subheading: { weight: 500, lineHeight: 1.25 },
              body:       { weight: 300, lineHeight: 1.6 },
              small:      { weight: 400, lineHeight: 1.2, size: 0.688 },
              caption:    { weight: 400, lineHeight: 1.1, size: 0.5 },
            }}
          />

          <WeightLineHeightOption
            number={3}
            label="Light heads, medium subs"
            vibe="Lighter 300 headings with 500 subheadings for contrast"
            levels={{
              heading:    { weight: 300, lineHeight: 1.15 },
              subheading: { weight: 500, lineHeight: 1.25 },
              body:       { weight: 400, lineHeight: 1.6 },
              small:      { weight: 500, lineHeight: 1.2, size: 0.688 },
              caption:    { weight: 500, lineHeight: 1.1, size: 0.5 },
            }}
          />
        </div>
      </Section>
    </div>
  );
}

/* ─── Sub-components ─── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-20">
      <h2 className="font-serif text-2xl text-primary-900 mb-8 pb-3 border-b border-warm-200">
        {title}
      </h2>
      {children}
    </section>
  );
}

function WeightLineHeightOption({
  number,
  label,
  vibe,
  levels,
}: {
  number: number;
  label: string;
  vibe: string;
  levels: {
    heading: { weight: number; lineHeight: number; size?: number };
    subheading: { weight: number; lineHeight: number; size?: number };
    body: { weight: number; lineHeight: number; size?: number };
    small: { weight: number; lineHeight: number; size?: number };
    caption: { weight: number; lineHeight: number; size?: number };
  };
}) {
  const font = "'Space Grotesk', sans-serif";

  return (
    <div className="bg-surface-raised rounded-lg border border-warm-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-warm-200 bg-warm-50 flex items-baseline justify-between">
        <div>
          <span className="text-xs uppercase tracking-wider text-warm-500 mr-3">Option {number}</span>
          <span className="text-sm font-medium text-primary-900">{label}</span>
        </div>
        <span className="text-xs text-warm-500 italic">{vibe}</span>
      </div>
      <div className="p-12">
        {/* Nav bar */}
        <div className="flex items-center gap-6 pb-4 mb-12 border-b border-warm-200">
          <span
            style={{ fontFamily: font, fontSize: '0.563rem', fontWeight: levels.caption.weight, lineHeight: levels.caption.lineHeight, textTransform: 'uppercase' as const, letterSpacing: '3px' }}
            className="text-primary-900"
          >
            AI Mavericks
          </span>
          <div className="flex gap-4 ml-auto">
            <span style={{ fontFamily: font, fontSize: '0.75rem', fontWeight: levels.small.weight, textTransform: 'uppercase' as const, letterSpacing: '1.5px' }} className="text-primary-900">
              People
            </span>
            <span style={{ fontFamily: font, fontSize: '0.75rem', fontWeight: levels.small.weight, textTransform: 'uppercase' as const, letterSpacing: '1.5px' }} className="text-warm-400">
              Dinners
            </span>
          </div>
        </div>

        {/* Page heading */}
        <h2
          style={{ fontFamily: font, fontSize: `${levels.heading.size ?? 2.369}rem`, fontWeight: levels.heading.weight, lineHeight: levels.heading.lineHeight }}
          className="text-primary-950 mb-16"
        >
          January 2025 Dinner
        </h2>

        {/* Subheading + body paragraph */}
        <h4
          style={{ fontFamily: font, fontSize: `${levels.subheading.size ?? 1.333}rem`, fontWeight: levels.subheading.weight, lineHeight: levels.subheading.lineHeight }}
          className="text-primary-800 mb-5"
        >
          Discussion Topics
        </h4>
        <p
          style={{ fontFamily: font, fontSize: `${levels.body.size ?? 1}rem`, fontWeight: levels.body.weight, lineHeight: 1.45 }}
          className="text-warm-700 max-w-lg mb-6"
        >
          Software engineer by trade with experience in finance, mobility startups,
          energy and reinsurance. Founded Kiseki Labs AI Consultancy. Writes about
          LLMs and AI Agents on Substack.
        </p>

        {/* Bulleted list */}
        <ul className="mb-14 max-w-lg" style={{ fontFamily: font, fontSize: `${levels.body.size ?? 1}rem`, fontWeight: levels.body.weight, lineHeight: 1.35 }}>
          {['Should junior developers bother learning traditional coding?',
            'Killing the Code Review — swyx',
            'Building AI products vs AI features',
          ].map((item) => (
            <li key={item} className="text-warm-700 ml-5 mb-1" style={{ listStyleType: 'disc' }}>{item}</li>
          ))}
        </ul>

        {/* Section divider + second subheading */}
        <div className="border-t border-warm-200 pt-12 mb-10">
          <h4
            style={{ fontFamily: font, fontSize: `${levels.subheading.size ?? 1.333}rem`, fontWeight: levels.subheading.weight, lineHeight: levels.subheading.lineHeight }}
            className="text-primary-800 mb-8"
          >
            Attendees
          </h4>
        </div>

        {/* Member cards row */}
        <div className="grid grid-cols-3 gap-6 mb-14">
          {[
            { name: 'Eddie Forson', role: 'Software Engineer' },
            { name: 'Bode Ogunlana', role: 'Product Manager' },
            { name: 'David Farrell', role: 'Data Scientist' },
          ].map(({ name, role }) => (
            <div key={name} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-sm bg-primary-200 shrink-0" />
              <div>
                <p
                  style={{ fontFamily: font, fontSize: `${levels.body.size ?? 1}rem`, fontWeight: levels.body.weight, lineHeight: 1.3 }}
                  className="text-primary-900"
                >
                  {name}
                </p>
                <p
                  style={{ fontFamily: font, fontSize: `${levels.small.size ?? 0.75}rem`, fontWeight: levels.small.weight, lineHeight: levels.small.lineHeight, textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}
                  className="text-warm-500"
                >
                  {role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {['AI Agents', 'LLMs', 'FinTech', 'Healthcare', 'Robotics', 'Creative AI'].map((tag) => (
            <span
              key={tag}
              style={{ fontFamily: font, fontSize: `${levels.small.size ?? 0.75}rem`, fontWeight: levels.small.weight, textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}
              className="px-3 py-1.5 border border-warm-300 rounded-sm text-warm-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer-style caption */}
        <div className="border-t border-warm-100 pt-6">
          <p
            style={{ fontFamily: font, fontSize: `${levels.caption.size ?? 0.563}rem`, fontWeight: levels.caption.weight, lineHeight: levels.caption.lineHeight, textTransform: 'uppercase' as const, letterSpacing: '1.5px' }}
            className="text-warm-400"
          >
            AI Mavericks London &bull; Est. October 2024 &bull; Discord &bull; Newsletter
          </p>
        </div>
      </div>
    </div>
  );
}

