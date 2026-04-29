"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { FiPlay, FiX } from "react-icons/fi";
import SectionHeading from "../SectionHeading";
import AmbientLayer from "../AmbientLayer";
import { portfolioData } from "@/data/portfolio";

export default function ShowreelSection() {
  const shouldReduceMotion = useReducedMotion();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handleClose = () => {
    setIsVideoOpen(false);
    setTimeout(() => setVideoError(false), 300);
  };

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
                <button 
                  type="button" 
                  aria-label="Play showreel preview"
                  onClick={() => setIsVideoOpen(true)}
                  className="group flex h-20 w-20 cursor-pointer shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white transition hover:scale-105 hover:bg-white/12 relative z-10"
                >
                  <FiPlay className="text-2xl transition group-hover:translate-x-0.5 ml-1" />
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

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl"
            onClick={handleClose}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative flex max-h-[90vh] w-full max-w-5xl items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-black/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                type="button"
                className="absolute right-6 top-6 z-[100] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:scale-110 hover:bg-black/80"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleClose();
                }}
              >
                <FiX className="h-6 w-6" />
              </button>

              {videoError ? (
                <div className="flex h-[50vh] w-full flex-col items-center justify-center space-y-4 rounded-[2rem] bg-[#0a0c10] p-8 text-center border border-white/5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/20"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>
                  <div>
                    <p className="text-lg text-white">Video Asset Pending</p>
                    <p className="text-sm text-white/40 mt-1">Please place the video file at:<br/><code className="text-xs bg-black/50 px-2 py-1 rounded mt-2 inline-block">/assets/instareel.mp4</code></p>
                  </div>
                </div>
              ) : (
                <video 
                  src="/assets/instareel.mp4" 
                  controls 
                  autoPlay 
                  className="h-full w-full max-h-[85vh] rounded-[2rem] object-contain outline-none bg-black"
                  onError={() => setVideoError(true)}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
