// Landing intro block below the hero. Tailwind utilities (no horizontal padding so
// it left-aligns with the page content). Padding/margin use the `!` important modifier
// because theme.css's unlayered `* { padding: 0; margin: 0 }` reset otherwise nullifies them.
export function LandingIntro() {
  return (
    <section className="pt-9! pb-8! max-w-[680px]">
      <h2 className="font-sans font-light text-[length:var(--font-size-xl)] leading-[1.15] text-text m-0 mb-[8px]!">
        A community of AI builders
      </h2>
      <p className="font-sans font-normal text-[length:var(--font-size-base)] leading-[1.45] text-secondary m-0">
        We bring together engineers, researchers, and founders who are building with AI — over
        intimate dinners designed for real conversation. Explore the people and the gatherings
        that make up Mavericks.
      </p>
    </section>
  );
}
