"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import SectionHeading from "../SectionHeading";
import AmbientLayer from "../AmbientLayer";
import { portfolioData } from "@/data/portfolio";

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-shell relative">
      <AmbientLayer variant="pink" grid />
      <div className="relative" style={{ zIndex: 1 }}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Featured Projects"
            title="Selected work designed to feel cinematic, tactile, and impossible to ignore."
            description="Each concept blends storytelling, visual rhythm, and brand clarity with strong motion fundamentals."
          />
          <a href="#contact" data-reveal
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-white/65 transition hover:text-white">
            Book a custom project <FiArrowRight />
          </a>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {portfolioData.projects.map((project, index) => (
            <motion.article key={project.title} data-reveal
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
              className="glass-panel aurora-border group relative overflow-hidden rounded-[2rem] p-6 md:p-7">
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.accent}`} />
              </div>
              <div className="relative">
                <div className="relative h-72 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(95,140,255,0.22),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(255,77,151,0.18),transparent_25%),linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.01))]">
                  <div className="absolute inset-y-0 -left-1/3 w-1/3 rotate-[20deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)] opacity-0 transition duration-700 group-hover:left-[130%] group-hover:opacity-100" />
                  <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/75">
                    0{index + 1}
                  </div>
                  <div className="absolute right-6 top-6 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/75">
                    {project.category}
                  </div>
                  <div className="absolute inset-0 p-6">
                    <div className="relative flex h-full items-end justify-between gap-4">
                      <div className="max-w-xs">
                        <p className="text-sm uppercase tracking-[0.25em] text-white/45">{project.previewLabel}</p>
                        <div className="mt-4 flex items-end gap-3">
                          <div className="h-16 w-16 rounded-full border border-white/12 bg-white/10 shadow-[0_0_45px_rgba(95,140,255,0.25)]" />
                          <div className="h-28 w-28 rounded-[1.75rem] border border-white/12 bg-white/5 backdrop-blur-sm" />
                        </div>
                      </div>
                      <div className="space-y-3 text-right">
                        <div className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/68">
                          {project.deliverable}
                        </div>
                        <div className="text-sm uppercase tracking-[0.3em] text-white/40">{project.year}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="mt-7 text-3xl font-medium tracking-[-0.05em] text-white">{project.title}</h3>
                <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">{project.description}</p>
                <a href="#showreel"
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:border-white/24 hover:bg-white/6">
                  Preview <FiArrowRight />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
