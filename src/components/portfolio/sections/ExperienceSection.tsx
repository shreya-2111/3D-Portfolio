import SectionHeading from "../SectionHeading";
import AmbientLayer from "../AmbientLayer";
import { portfolioData } from "@/data/portfolio";

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-shell relative">
      <AmbientLayer variant="pink" />
      <div className="relative" style={{ zIndex: 1 }}>
        <SectionHeading
          eyebrow="Experience"
          title="A path shaped by studio rigor, independent craft, and global collaboration."
          description="Each role sharpened both the artistic language and the production discipline behind premium motion work."
        />
        <div className="mt-14 space-y-6">
          {portfolioData.timeline.map((item) => (
            <div
              key={item.year}
              data-reveal
              className="glass-panel aurora-border relative overflow-hidden rounded-[2rem] p-6 md:p-8"
            >
              <div className="absolute bottom-0 left-8 top-0 hidden w-px bg-gradient-to-b from-transparent via-white/20 to-transparent md:block" />
              <div className="grid gap-6 md:grid-cols-[180px_1fr] md:items-start">
                <div className="text-sm font-medium uppercase tracking-[0.4em] text-[var(--color-accent-2)]">
                  {item.year}
                </div>
                <div>
                  <h3 className="text-2xl font-medium tracking-[-0.04em] text-white">{item.title}</h3>
                  <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-muted)]">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
