"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
  onSkip: () => void;
  onStart: (message: string) => void;
};

function BlinkEyeFlat() {
  return (
    <motion.div
      animate={{ scaleY: [1, 0.08, 1] }}
      transition={{
        duration: 0.18,
        repeat: Infinity,
        repeatDelay: 2.5 + Math.random() * 2.0,
        ease: "easeInOut",
      }}
      className="h-6 w-3 rounded-full bg-white"
      style={{ transformOrigin: "center" }}
    />
  );
}

export function WelcomeOverlay({ onSkip, onStart }: Props) {
  const [input, setInput] = useState("");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-pink-100">
      <div className="flex flex-col items-center text-center px-6">
        {/* Mascot (ONLY ONE) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative flex items-end justify-center"
        >
          <motion.div
            animate={{
              x: [-10, 10, -10],
              y: [0, -6, 0],
              rotate: [-2, 2, -2],
              scaleX: [1, 1.03, 1],
              scaleY: [1, 0.98, 1],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            {/* Shadow */}
            <motion.div
              animate={{ scaleX: [1, 0.85, 1], opacity: [0.22, 0.15, 0.22] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-[230px] h-4 w-40 -translate-x-1/2 rounded-full bg-pink-200"
            />

            {/* Body */}
            <div className="relative h-52 w-52 rounded-full bg-pink-400">
              {/* Cheeks */}
              <div className="absolute left-10 top-[120px] h-4 w-6 rounded-full bg-pink-300/80" />
              <div className="absolute right-10 top-[120px] h-4 w-6 rounded-full bg-pink-300/80" />

              {/* Eyes */}
              <div className="absolute left-1/2 top-[82px] flex -translate-x-1/2 gap-12">
                <BlinkEyeFlat />
                <BlinkEyeFlat />
              </div>

              {/* Nose */}
              <div className="absolute left-1/2 top-[112px] h-3 w-8 -translate-x-1/2 rounded-full bg-pink-200" />

              {/* Smile */}
              <motion.div
                animate={{ scaleX: [1, 1.12, 1] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 top-[140px] h-6 w-12 -translate-x-1/2 rounded-b-full border-b-[5px] border-white"
              />

              {/* Arms */}
              <motion.div
                animate={{ rotate: [-12, 10, -12] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-8 top-[132px] h-10 w-16 rounded-full bg-pink-400"
              />
              <motion.div
                animate={{ rotate: [12, -10, 12] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 top-[132px] h-10 w-16 rounded-full bg-pink-400"
              />
            </div>

            {/* Legs */}
            <div className="mt-2 flex justify-center gap-8">
              <div className="h-16 w-7 rounded-2xl bg-pink-500" />
              <div className="h-16 w-7 rounded-2xl bg-pink-500" />
            </div>

            {/* Shoes */}
            <div className="-mt-2 flex justify-center gap-8">
              <div className="h-6 w-12 rounded-2xl bg-pink-300" />
              <div className="h-6 w-12 rounded-2xl bg-pink-300" />
            </div>
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-10 max-w-md"
        >
          <h1 className="text-2xl font-semibold text-neutral-900">Hello.</h1>
          <p className="mt-2 text-neutral-700">
            Talk to me. What’s up with you today? What do you want to learn?
          </p>
        </motion.div>

        {/* Input + Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-6 w-full max-w-md"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tell me what you're thinking..."
            className="w-full rounded-2xl border border-pink-200 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-pink-300"
          />

          <div className="mt-4 flex justify-center gap-4">
            <button
              type="button"
              onClick={onSkip}
              className="rounded-xl border border-pink-200 bg-white/70 px-4 py-2 text-sm hover:bg-white"
            >
              Skip
            </button>

            <button
              type="button"
              onClick={() => onStart(input.trim() || "Hi")}
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