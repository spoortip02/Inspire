"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
  onSkip: () => void;
  onStart: (message: string) => void;
};

export function WelcomeOverlay({ onSkip, onStart }: Props) {
  const [input, setInput] = useState("");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center text-center">

        {/* Soft Pink Orb */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Glow */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 to-red-400 blur-2xl opacity-50"
          />

          {/* Orb */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-40 w-40 rounded-full bg-gradient-to-br from-pink-400 to-red-400 shadow-2xl"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 max-w-md"
        >
          <h1 className="text-2xl font-semibold text-neutral-900">
            Hello.
          </h1>
          <p className="mt-2 text-neutral-600">
            Talk to me. What’s up with you today?
          </p>
        </motion.div>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 w-full max-w-md"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tell me what you're thinking..."
            className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-pink-300"
          />

          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={onSkip}
              className="rounded-xl border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-100"
            >
              Skip
            </button>

            <button
              onClick={() => {
                if (!input.trim()) return;
                onStart(input);
              }}
              className="rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-neutral-800"
            >
              Let’s talk
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
