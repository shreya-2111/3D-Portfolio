"use client";

import { motion } from "framer-motion";

const words = ["Motion", "Rhythm", "Depth", "Atmosphere"];

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
      className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-[#04050d]"
    >
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-medium uppercase tracking-[0.7em] text-white/45"
        >
          Sumit Tirmare Portfolio
        </motion.p>
        <div className="mt-8 overflow-hidden text-4xl font-semibold tracking-[-0.06em] text-white md:text-7xl">
          {words.map((word, index) => (
            <motion.div
              key={word}
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 + index * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
