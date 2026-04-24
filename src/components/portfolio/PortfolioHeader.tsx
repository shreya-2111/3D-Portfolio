"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { portfolioData } from "@/data/portfolio";

export default function PortfolioHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto mt-4 max-w-7xl px-4 md:px-8">
          <div className="glass-panel aurora-border flex items-center justify-between rounded-full px-4 py-3 md:px-6">
            <a href="#home" className="text-sm font-semibold uppercase tracking-[0.48em] text-white">
              ST
            </a>

            <nav className="hidden items-center gap-7 text-sm text-white/72 md:flex">
              {portfolioData.nav.map((item) => (
                <a key={item.href} href={item.href} className="transition hover:text-white">
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="hidden rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white transition hover:bg-white/10 md:inline-flex"
              >
                Let&apos;s Talk
              </a>
              <button
                type="button"
                onClick={() => setIsOpen((current) => !current)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white md:hidden"
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed inset-x-4 top-24 z-30 md:hidden"
          >
            <div className="glass-panel aurora-border rounded-[2rem] p-5">
              <nav className="flex flex-col gap-2">
                {portfolioData.nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm uppercase tracking-[0.18em] text-white/78 transition hover:bg-white/6 hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
