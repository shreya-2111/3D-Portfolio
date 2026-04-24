"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type AnimatedCounterProps = {
  value: number;
  suffix: string;
  label: string;
};

export default function AnimatedCounter({
  value,
  suffix,
  label,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      return;
    }

    const duration = 1400;
    const start = performance.now();

    const frame = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };

    requestAnimationFrame(frame);
  }, [isInView, shouldReduceMotion, value]);

  const displayCount = shouldReduceMotion && isInView ? value : count;

  return (
    <div
      ref={ref}
      className="glass-panel aurora-border flex min-h-36 flex-col justify-between rounded-[1.75rem] p-6"
      data-reveal
    >
      <p className="text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
        {displayCount}
        {suffix}
      </p>
      <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-muted)]">{label}</p>
    </div>
  );
}
