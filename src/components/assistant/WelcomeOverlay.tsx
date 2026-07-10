"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Design tokens for this component (and worth reusing across the app
 * for consistency — see notes at the bottom of this file).
 *
 *   paper      #F5F1E7   background
 *   card       #FBF8F1   card / index-card surface
 *   ink        #211E1A   primary text
 *   cobalt     #2A46C9   primary accent (links, focus, primary button hover)
 *   poppy      #D6402C   secondary accent (tape, small highlights)
 *   sage       #7C8A66   tertiary accent (used sparingly)
 *
 * Fonts: swap these next/font imports for your project's font loader.
 * Display: a serif with real weight (Fraunces / Canela / similar), used
 * upright, never italic. Utility/mono: IBM Plex Mono or Space Mono for
 * labels, eyebrows, and the input placeholder — this is what gives the
 * page its "studio" register instead of "wellness app" register.
 */

type Props = {
  onSkip: () => void;
  onStart: (message: string) => void;
};

const SWATCHES = [
  { color: "#2A46C9", x: -86, y: -58, rot: -14, w: 74, h: 96, tape: true },
  { color: "#D6402C", x: 64, y: -70, rot: 10, w: 66, h: 88, tape: false },
  { color: "#F5F1E7", x: -30, y: -96, rot: -4, w: 88, h: 62, tape: true, border: true },
  { color: "#7C8A66", x: 92, y: 20, rot: 16, w: 70, h: 92, tape: false },
  { color: "#211E1A", x: -92, y: 30, rot: -18, w: 62, h: 82, tape: false },
  { color: "#FBF8F1", x: 20, y: 62, rot: 6, w: 96, h: 68, tape: true, border: true },
];

export function WelcomeOverlay({ onSkip, onStart }: Props) {
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"intro" | "headline" | "chat">("intro");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("headline"), 1200);
    const t2 = setTimeout(() => setPhase("chat"), 2100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F5F1E7] px-6">
      {/* paper grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {/* faint blueprint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#211E1A 1px, transparent 1px), linear-gradient(90deg, #211E1A 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative flex w-full max-w-2xl flex-col items-center text-center">
        {/* collage cluster */}
        <motion.div
          initial={false}
          animate={{
            y: phase === "intro" ? 0 : -36,
            scale: phase === "intro" ? 1 : 0.56,
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-6 h-48 w-48"
        >
          {SWATCHES.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.3, rotate: s.rot * 2.4, x: s.x * 1.6, y: s.y * 1.6 - 40 }}
              animate={{ opacity: 1, scale: 1, rotate: s.rot, x: s.x, y: s.y }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-1/2 top-1/2 shadow-[3px_4px_0_rgba(33,30,26,0.12)]"
              style={{
                width: s.w,
                height: s.h,
                marginLeft: -s.w / 2,
                marginTop: -s.h / 2,
                backgroundColor: s.color,
                border: s.border ? "1px solid rgba(33,30,26,0.15)" : "none",
                clipPath:
                  "polygon(2% 4%, 96% 0%, 100% 92%, 6% 100%, 0% 55%)",
              }}
            >
              {s.tape && (
                <span
                  className="absolute left-1/2 top-0 h-4 w-10 -translate-x-1/2 -translate-y-1/2 rotate-2 bg-[#FBF8F1]/80"
                  style={{ boxShadow: "0 1px 2px rgba(33,30,26,0.15)" }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* eyebrow sticker */}
        <AnimatePresence>
          {phase !== "intro" && (
            <motion.div
              initial={{ opacity: 0, y: 10, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-3 inline-block rounded-sm border border-dashed border-[#2A46C9]/40 px-3 py-1"
            >
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#2A46C9]">
                a space for your ideas
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* wordmark */}
        <AnimatePresence>
          {phase !== "intro" && (
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-serif text-6xl font-semibold tracking-tight text-[#211E1A]"
            >
              Inspire
            </motion.h1>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === "chat" && (
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-6 w-full max-w-xl"
            >
              <p className="text-base leading-7 text-[#211E1A]/70">
                What's on your mind today? What would you like to explore?
              </p>

              <div className="mt-8">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: -0.6 }}
                  className="rounded-md border border-[#211E1A]/10 bg-[#FBF8F1] px-5 py-4 text-left shadow-[4px_5px_0_rgba(33,30,26,0.08)]"
                >
                  <div className="mb-2 h-px w-10 bg-[#211E1A]/15" />
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Tell me what you're thinking..."
                    className="w-full bg-transparent font-mono text-[15px] text-[#211E1A] outline-none placeholder:text-[#211E1A]/35"
                  />
                </motion.div>

                <div className="mt-5 flex items-center justify-center gap-5">
                  <button
                    type="button"
                    onClick={onSkip}
                    className="font-mono text-xs uppercase tracking-wider text-[#211E1A]/50 underline decoration-dotted underline-offset-4 transition hover:text-[#211E1A]"
                  >
                    Skip for now
                  </button>

                  <button
                    type="button"
                    onClick={() => onStart(input.trim() || "Hi")}
                    className="group inline-flex items-center gap-2 rounded-sm bg-[#211E1A] px-6 py-3 text-sm font-medium text-[#F5F1E7] transition hover:bg-[#2A46C9]"
                  >
                    Let's talk
                    <span className="transition group-hover:translate-x-0.5">→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}