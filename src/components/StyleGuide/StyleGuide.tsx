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

      {/* ── Colours ── */}
      <Section title="Colours">
        <ColorGroup label="Primary" prefix="primary" />
        <ColorGroup label="Secondary" prefix="secondary" />
        <ColorGroup label="Warm Neutrals" prefix="warm" />
        <ColorGroup label="Success" prefix="success" />
        <ColorGroup label="Warning" prefix="warning" />
        <ColorGroup label="Error" prefix="error" />
        <ColorGroup label="Info" prefix="info" />

        <h3 className="font-serif text-lg mt-10 mb-4 text-primary-800">Surfaces</h3>
        <div className="grid grid-cols-3 gap-4">
          <SurfaceSwatch label="Surface" className="bg-surface" value="#f9f8f6" />
          <SurfaceSwatch label="Surface Raised" className="bg-surface-raised" value="#ffffff" />
          <SurfaceSwatch label="Surface Sunken" className="bg-surface-sunken" value="#f0ede8" />
        </div>
      </Section>

      {/* ── Typography ── */}
      <Section title="Typography">
        <h3 className="font-serif text-lg mb-6 text-primary-800">Font Families</h3>
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="bg-surface-raised rounded-lg p-6 shadow-sm border border-warm-200">
            <p className="text-xs uppercase tracking-wider text-warm-500 mb-2">Serif</p>
            <p className="font-serif text-3xl text-primary-900">EB Garamond</p>
            <p className="font-serif text-base text-warm-600 mt-2">
              The quick brown fox jumps over the lazy dog
            </p>
            <code className="text-xs text-warm-500 mt-3 block">font-serif</code>
          </div>
          <div className="bg-surface-raised rounded-lg p-6 shadow-sm border border-warm-200">
            <p className="text-xs uppercase tracking-wider text-warm-500 mb-2">Sans</p>
            <p className="font-sans text-3xl text-primary-900">Helvetica Neue</p>
            <p className="font-sans text-base text-warm-600 mt-2">
              The quick brown fox jumps over the lazy dog
            </p>
            <code className="text-xs text-warm-500 mt-3 block">font-sans</code>
          </div>
        </div>

        <h3 className="font-serif text-lg mb-6 text-primary-800">Type Scale (Minor Third — 1.200)</h3>
        <div className="space-y-0 bg-surface-raised rounded-lg border border-warm-200 overflow-hidden">
          <TypeRow size="5xl" label="3.583rem / ~57px" sample="Display" />
          <TypeRow size="4xl" label="2.986rem / ~48px" sample="Hero Heading" />
          <TypeRow size="3xl" label="2.488rem / ~40px" sample="Page Title" />
          <TypeRow size="2xl" label="2.074rem / ~33px" sample="Section Heading" />
          <TypeRow size="xl" label="1.728rem / ~28px" sample="Subheading" />
          <TypeRow size="lg" label="1.44rem / ~23px" sample="Large Text" />
          <TypeRow size="md" label="1.2rem / ~19px" sample="Medium Text" />
          <TypeRow size="base" label="1rem / 16px" sample="Body Text" />
          <TypeRow size="sm" label="0.833rem / ~13px" sample="Small Text" />
          <TypeRow size="xs" label="0.694rem / ~11px" sample="Caption" />
        </div>

        <h3 className="font-serif text-lg mt-12 mb-6 text-primary-800">Font Weights</h3>
        <div className="bg-surface-raised rounded-lg border border-warm-200 overflow-hidden">
          <WeightRow weight="font-normal" label="400 — Normal" />
          <WeightRow weight="font-medium" label="500 — Medium" />
          <WeightRow weight="font-semibold" label="600 — Semibold" />
          <WeightRow weight="font-bold" label="700 — Bold" />
        </div>

        <h3 className="font-serif text-lg mt-12 mb-6 text-primary-800">Line Heights</h3>
        <div className="grid grid-cols-2 gap-4">
          <LineHeightDemo name="Tight" value="1.15" className="leading-tight" />
          <LineHeightDemo name="Snug" value="1.3" className="leading-snug" />
          <LineHeightDemo name="Normal" value="1.5" className="leading-normal" />
          <LineHeightDemo name="Relaxed" value="1.7" className="leading-relaxed" />
        </div>

        <h3 className="font-serif text-lg mt-12 mb-6 text-primary-800">Letter Spacing</h3>
        <div className="bg-surface-raised rounded-lg border border-warm-200 overflow-hidden">
          <div className="flex items-baseline justify-between px-6 py-4 border-b border-warm-100">
            <span className="text-lg tracking-tight text-primary-900">Tight tracking</span>
            <code className="text-xs text-warm-500">tracking-tight / -0.02em</code>
          </div>
          <div className="flex items-baseline justify-between px-6 py-4 border-b border-warm-100">
            <span className="text-lg tracking-normal text-primary-900">Normal tracking</span>
            <code className="text-xs text-warm-500">tracking-normal / 0</code>
          </div>
          <div className="flex items-baseline justify-between px-6 py-4 border-b border-warm-100">
            <span className="text-lg tracking-wide text-primary-900">Wide tracking</span>
            <code className="text-xs text-warm-500">tracking-wide / 0.05em</code>
          </div>
          <div className="flex items-baseline justify-between px-6 py-4">
            <span className="text-lg tracking-wider text-primary-900">Wider tracking</span>
            <code className="text-xs text-warm-500">tracking-wider / 0.1em</code>
          </div>
        </div>
      </Section>

      {/* ── Spacing ── */}
      <Section title="Spacing">
        <p className="text-warm-600 mb-6">
          Uses Tailwind's default 0.25rem (4px) base unit. Showing common stops.
        </p>
        <div className="space-y-3">
          {[
            ['0.5', '0.125rem', '2px'],
            ['1', '0.25rem', '4px'],
            ['2', '0.5rem', '8px'],
            ['3', '0.75rem', '12px'],
            ['4', '1rem', '16px'],
            ['6', '1.5rem', '24px'],
            ['8', '2rem', '32px'],
            ['10', '2.5rem', '40px'],
            ['12', '3rem', '48px'],
            ['16', '4rem', '64px'],
            ['20', '5rem', '80px'],
            ['24', '6rem', '96px'],
          ].map(([key, rem, px]) => (
            <div key={key} className="flex items-center gap-4">
              <code className="text-xs text-warm-500 w-20 text-right shrink-0">{key}</code>
              <div
                className="h-4 bg-primary-400 rounded-sm"
                style={{ width: rem }}
              />
              <span className="text-xs text-warm-500">
                {rem} / {px}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Border Radius ── */}
      <Section title="Border Radius">
        <div className="grid grid-cols-5 gap-6">
          <RadiusDemo name="sm" value="4px" className="rounded-sm" />
          <RadiusDemo name="md" value="6px" className="rounded-md" />
          <RadiusDemo name="lg" value="10px" className="rounded-lg" />
          <RadiusDemo name="xl" value="16px" className="rounded-xl" />
          <RadiusDemo name="full" value="9999px" className="rounded-full" />
        </div>
      </Section>

      {/* ── Shadows ── */}
      <Section title="Shadows">
        <div className="grid grid-cols-3 gap-8">
          <ShadowDemo name="sm" className="shadow-sm" />
          <ShadowDemo name="md" className="shadow-md" />
          <ShadowDemo name="lg" className="shadow-lg" />
        </div>
      </Section>

      {/* ── Breakpoints ── */}
      <Section title="Breakpoints">
        <div className="bg-surface-raised rounded-lg border border-warm-200 overflow-hidden">
          {[
            ['sm', '480px', 'Mobile landscape'],
            ['md', '768px', 'Tablet'],
            ['lg', '1024px', 'Desktop'],
            ['xl', '1280px', 'Large desktop'],
            ['2xl', '1536px', 'Wide screen'],
          ].map(([name, value, usage], i, arr) => (
            <div
              key={name}
              className={`flex items-center justify-between px-6 py-4 ${i < arr.length - 1 ? 'border-b border-warm-100' : ''}`}
            >
              <div className="flex items-center gap-4">
                <code className="text-sm font-semibold text-primary-800 w-12">{name}</code>
                <div
                  className="h-2 bg-secondary-300 rounded-full"
                  style={{ width: `${parseInt(value) / 10}px` }}
                />
              </div>
              <div className="flex items-center gap-6">
                <span className="text-sm text-warm-600">{usage}</span>
                <code className="text-xs text-warm-400">{value}</code>
              </div>
            </div>
          ))}
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

const COLOR_SHADES = ['50','100','200','300','400','500','600','700','800','900','950'] as const;

const COLOR_HEX: Record<string, Record<string, string>> = {
  primary: {
    '50':'#faf9f7','100':'#f3f1ec','200':'#e6e2d9','300':'#d5cfc2','400':'#b8af9d',
    '500':'#9a8e78','600':'#7d6f58','700':'#635847','800':'#4a4236','900':'#2a2a2a','950':'#1a1917',
  },
  secondary: {
    '50':'#f7f8fa','100':'#e8ecf1','200':'#d1d9e3','300':'#a8b6c8','400':'#7f93ad',
    '500':'#5e7491','600':'#4a5d76','700':'#3b4a5e','800':'#2d3847','900':'#1f2730','950':'#141a21',
  },
  warm: {
    '50':'#faf9f7','100':'#f5f3ef','200':'#ebe7e0','300':'#ddd8ce','400':'#c5bfb2',
    '500':'#a9a193','600':'#8d8474','700':'#6e6758','800':'#504a3f','900':'#332f28','950':'#1c1a16',
  },
  success: {
    '50':'#f4f8f4','100':'#e2ede2','200':'#c5dbc5','300':'#9cc39c','400':'#73a873',
    '500':'#548c54','600':'#427042','700':'#365a36','800':'#2c472c','900':'#1e301e',
  },
  warning: {
    '50':'#fdf8f0','100':'#f9edda','200':'#f2d9b0','300':'#e8c080','400':'#dda550',
    '500':'#c98c33','600':'#a67228','700':'#835a21','800':'#63441c','900':'#432f16',
  },
  error: {
    '50':'#fdf5f3','100':'#f9e5e0','200':'#f2c9c0','300':'#e5a393','400':'#d47a66',
    '500':'#b95a44','600':'#984636','700':'#79382c','800':'#5c2c24','900':'#3f1f1a',
  },
  info: {
    '50':'#f3f6f9','100':'#e1e9f0','200':'#c3d3e1','300':'#97b3ca','400':'#6d93b3',
    '500':'#4e7799','600':'#3d5f7d','700':'#324c64','800':'#273b4d','900':'#1c2a37',
  },
};

function ColorGroup({ label, prefix }: { label: string; prefix: string }) {
  const hexMap = COLOR_HEX[prefix] ?? {};
  const shades = prefix === 'success' || prefix === 'warning' || prefix === 'error' || prefix === 'info'
    ? COLOR_SHADES.filter(s => s !== '950')
    : COLOR_SHADES;

  return (
    <div className="mb-8">
      <h3 className="font-serif text-lg mb-3 text-primary-800">{label}</h3>
      <div className="flex gap-2">
        {shades.map((shade) => {
          const hex = hexMap[shade] ?? '';
          const isDark = parseInt(shade) >= 500;
          return (
            <div key={shade} className="flex-1 min-w-0">
              <div
                className="aspect-square rounded-md mb-2"
                style={{ backgroundColor: hex }}
              />
              <p className={`text-xs ${isDark ? 'font-medium' : ''} text-primary-800`}>{shade}</p>
              <p className="text-xs text-warm-500 truncate">{hex}</p>
              <p className="text-xs text-warm-400 truncate">{prefix}-{shade}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SurfaceSwatch({ label, className, value }: { label: string; className: string; value: string }) {
  return (
    <div>
      <div className={`${className} h-20 rounded-lg border border-warm-200 mb-2`} />
      <p className="text-sm font-medium text-primary-800">{label}</p>
      <p className="text-xs text-warm-500">{value}</p>
    </div>
  );
}

function TypeRow({ size, label, sample }: { size: string; label: string; sample: string }) {
  return (
    <div className="flex items-baseline justify-between px-6 py-4 border-b border-warm-100 last:border-b-0">
      <span className={`text-${size} font-serif text-primary-900 leading-tight`}>{sample}</span>
      <div className="text-right shrink-0 ml-8">
        <code className="text-xs text-warm-500 block">text-{size}</code>
        <span className="text-xs text-warm-400">{label}</span>
      </div>
    </div>
  );
}

function WeightRow({ weight, label }: { weight: string; label: string }) {
  return (
    <div className="flex items-baseline justify-between px-6 py-4 border-b border-warm-100 last:border-b-0">
      <span className={`text-lg ${weight} text-primary-900`}>
        The quick brown fox jumps over the lazy dog
      </span>
      <code className="text-xs text-warm-500 shrink-0 ml-8">{label}</code>
    </div>
  );
}

function LineHeightDemo({ name, value, className }: { name: string; value: string; className: string }) {
  return (
    <div className="bg-surface-raised rounded-lg p-5 border border-warm-200">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-primary-800">{name}</p>
        <code className="text-xs text-warm-500">{className.replace('leading-', '')} / {value}</code>
      </div>
      <p className={`text-base text-warm-700 ${className}`}>
        Typography is the art and technique of arranging type to make written language legible,
        readable, and appealing when displayed.
      </p>
    </div>
  );
}

function RadiusDemo({ name, value, className }: { name: string; value: string; className: string }) {
  return (
    <div className="text-center">
      <div className={`w-20 h-20 mx-auto bg-primary-200 border-2 border-primary-400 ${className} mb-3`} />
      <p className="text-sm font-medium text-primary-800">{name}</p>
      <code className="text-xs text-warm-500">{value}</code>
    </div>
  );
}

function ShadowDemo({ name, className }: { name: string; className: string }) {
  return (
    <div className="text-center">
      <div className={`h-24 bg-surface-raised rounded-lg ${className} mb-3`} />
      <p className="text-sm font-medium text-primary-800">shadow-{name}</p>
    </div>
  );
}
