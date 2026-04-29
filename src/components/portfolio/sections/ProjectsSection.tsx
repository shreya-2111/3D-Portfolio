"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiX, FiPlay } from "react-icons/fi";
import SectionHeading from "../SectionHeading";
import AmbientLayer from "../AmbientLayer";
import { portfolioData } from "@/data/portfolio";

export default function ProjectsSection() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videoError, setVideoError] = useState(false);

  // Reset video error state when modal opens/closes
  const handleClose = () => {
    setSelectedVideo(null);
    setTimeout(() => setVideoError(false), 300);
  };

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
                
                {/* Image Container with explicit crop to hide taskbars */}
                <div className="group/img relative h-[340px] w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0d0f1a]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute left-1/2 top-1/2 min-h-[115%] min-w-[115%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/800x600/0d0f1a/333?text=Thumbnail+Pending";
                    }}
                  />
                  
                  {/* Floating Number & Category Labels */}
                  <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/50 backdrop-blur-md px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/90 shadow-xl">
                    0{index + 1}
                  </div>
                  <div className="absolute right-6 top-6 rounded-full border border-white/10 bg-white/10 backdrop-blur-md px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/90 shadow-xl">
                    {project.category}
                  </div>
                </div>

                <div className="mt-7 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-3xl font-medium tracking-[-0.05em] text-white">{project.title}</h3>
                    <div className="mt-3 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-white/40">
                      <span>{project.deliverable}</span>
                      <span className="h-1 w-1 rounded-full bg-white/20"></span>
                      <span>{project.year}</span>
                    </div>
                  </div>
                </div>
                
                <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">{project.description}</p>
                
                <button
                  onClick={() => setSelectedVideo(project.reelVideo)}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:border-white/24 hover:bg-white/10 relative z-10 cursor-pointer">
                  Preview Reel <FiArrowRight />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {selectedVideo && (
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
                    <p className="text-sm text-white/40 mt-1">Please place the video file at:<br/><code className="text-xs bg-black/50 px-2 py-1 rounded mt-2 inline-block">{selectedVideo}</code></p>
                  </div>
                </div>
              ) : (
                <video 
                  src={selectedVideo} 
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
