"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiPlay } from "react-icons/fi";
import SectionHeading from "../SectionHeading";
import AmbientLayer from "../AmbientLayer";
import { portfolioData } from "@/data/portfolio";

export default function ShowreelSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="showreel" className="section-shell relative">
      <AmbientLayer variant="cyan" />
      <div className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center" style={{ zIndex: 1 }}>
        <SectionHeading
          eyebrow="Showreel"
          title="A visual reel space designed to feel like a cinematic trailer frame."
          description={portfolioData.showreel.description}
        />

        <motion.div data-reveal
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
          className="glass-panel aurora-border relative overflow-hidden rounded-[2.5rem] p-4 md:p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(95,140,255,0.22),transparent_25%),radial-gradient(circle_at_80%_10%,rgba(255,77,151,0.2),transparent_20%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))]" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#070b18] px-6 py-10 md:px-10 md:py-16">
            {!shouldReduceMotion && (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10"
                />
                <motion.div
                  animate={{ x: [0, 12, 0], y: [0, -12, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-8 left-8 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(95,140,255,0.22),transparent_70%)] blur-3xl"
                />
              </>
            )}
            <div className="flex flex-col justify-between gap-14 md:min-h-[28rem]">
              <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs uppercase tracking-[0.4em] text-white/45">{portfolioData.showreel.label}</p>
                  <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
                    {portfolioData.showreel.title}
                  </h3>
                </div>
                <button type="button" aria-label="Play showreel preview"
                  className="group flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white transition hover:scale-105 hover:bg-white/12">
                  <FiPlay className="text-2xl transition group-hover:translate-x-0.5" />
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {portfolioData.showreel.beats.map((item) => (
                  <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/45">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
