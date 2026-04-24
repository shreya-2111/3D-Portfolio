"use client";

import { useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMail, FiMapPin, FiPhone, FiSend, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import SectionHeading from "../SectionHeading";
import AmbientLayer from "../AmbientLayer";
import { portfolioData } from "@/data/portfolio";
import { sendContactEmail, type ContactActionResult } from "@/actions/contact";

function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ContactActionResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(null);
    setErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const response = await sendContactEmail(formData);
      setResult(response);

      if (response.success) {
        form.reset();
        // Auto-hide success message after 8 seconds
        setTimeout(() => setResult(null), 8000);
      } else if (response.errors) {
        setErrors(response.errors);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel aurora-border rounded-[2rem] p-6 md:p-8" data-reveal>
      {/* Honeypot field - hidden from users, catches bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px" }}
        aria-hidden="true"
      />

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Name *</span>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            minLength={2}
            maxLength={100}
            disabled={isPending}
            className="w-full rounded-2xl border border-white/10 bg-white/6 px-5 py-4 text-sm text-white outline-none transition focus:border-[var(--color-accent)] focus:bg-white/8 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {errors.name && (
            <p className="text-xs text-red-400 flex items-center gap-1">
              <FiAlertCircle className="shrink-0" />
              {errors.name[0]}
            </p>
          )}
        </label>

        <label className="space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Email *</span>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            maxLength={100}
            disabled={isPending}
            className="w-full rounded-2xl border border-white/10 bg-white/6 px-5 py-4 text-sm text-white outline-none transition focus:border-[var(--color-accent)] focus:bg-white/8 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {errors.email && (
            <p className="text-xs text-red-400 flex items-center gap-1">
              <FiAlertCircle className="shrink-0" />
              {errors.email[0]}
            </p>
          )}
        </label>
      </div>

      <label className="mt-5 block space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Subject *</span>
        <input
          type="text"
          name="subject"
          placeholder="What's this about?"
          required
          minLength={3}
          maxLength={200}
          disabled={isPending}
          className="w-full rounded-2xl border border-white/10 bg-white/6 px-5 py-4 text-sm text-white outline-none transition focus:border-[var(--color-accent)] focus:bg-white/8 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {errors.subject && (
          <p className="text-xs text-red-400 flex items-center gap-1">
            <FiAlertCircle className="shrink-0" />
            {errors.subject[0]}
          </p>
        )}
      </label>

      <label className="mt-5 block space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Message *</span>
        <textarea
          name="message"
          rows={6}
          required
          minLength={10}
          maxLength={5000}
          disabled={isPending}
          placeholder="Tell me about your project, timeline, and the kind of motion experience you want to build..."
          className="w-full rounded-[1.5rem] border border-white/10 bg-white/6 px-5 py-4 text-sm text-white outline-none transition focus:border-[var(--color-accent)] focus:bg-white/8 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
        />
        {errors.message && (
          <p className="text-xs text-red-400 flex items-center gap-1">
            <FiAlertCircle className="shrink-0" />
            {errors.message[0]}
          </p>
        )}
      </label>

      <div className="mt-6 flex flex-col gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-slate-950 transition hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isPending ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full"
              />
              Sending...
            </>
          ) : (
            <>
              Send Message <FiSend />
            </>
          )}
        </button>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex items-start gap-3 rounded-2xl border p-4 ${
                result.success
                  ? "border-green-500/20 bg-green-500/10 text-green-400"
                  : "border-red-500/20 bg-red-500/10 text-red-400"
              }`}
            >
              {result.success ? (
                <FiCheckCircle className="shrink-0 mt-0.5" />
              ) : (
                <FiAlertCircle className="shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="text-sm font-medium">{result.message}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

export default function ContactSection() {
  const contactItems = [
    { icon: FiMail, label: portfolioData.contact.email },
    { icon: FiPhone, label: portfolioData.contact.phone },
    { icon: FiMapPin, label: portfolioData.contact.location },
  ];

  return (
    <section id="contact" className="section-shell relative">
      <AmbientLayer variant="blue" />
      <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr]" style={{ zIndex: 1 }}>
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's build motion that feels expensive, memorable, and alive."
            description="Whether it's a launch film, a social-first reel, or a full visual identity system, the next piece can start here."
          />
          <div className="mt-10 space-y-4">
            {contactItems.map((item) => (
              <div
                key={item.label}
                data-reveal
                className="glass-panel aurora-border flex items-center gap-4 rounded-[1.5rem] p-5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-[var(--color-accent-2)]">
                  <item.icon />
                </div>
                <span className="text-sm text-white/86">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
