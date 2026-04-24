import { portfolioData } from "@/data/portfolio";
import { socialIcons } from "./portfolio-icons";

export default function PortfolioFooter() {
  return (
    <footer className="border-t border-white/6">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 md:px-8 md:py-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-white">Sumit Tirmare</p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Motion Graphic Designer &amp; 2D Animator
          </p> <br/>
          <p className="text-sm font-medium tracking-[0.35em] text-white">Design and Developed by SHREYA RAVAL.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {portfolioData.socials.map((social) => {
            const Icon = socialIcons[social.label];

            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/78 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <Icon />
                {social.label}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
