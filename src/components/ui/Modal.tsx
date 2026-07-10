"use client";

import { PropsWithChildren } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type ModalProps = PropsWithChildren<{
  open: boolean;
  title: string;
  onClose: () => void;
}>;

export function Modal({ open, title, onClose, children }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-lg overflow-hidden rounded-md border border-ink/10 bg-card shadow-[6px_8px_0_rgba(33,30,26,0.14)]"
              initial={{ y: 18, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 18, scale: 0.98, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* torn-edge accent strip */}
              <div className="h-1.5 w-full bg-cobalt" />

              <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
                <h2 className="font-serif text-base font-semibold text-ink">{title}</h2>
                <button
                  onClick={onClose}
                  className="grid h-8 w-8 place-items-center rounded-sm text-ink/50 transition hover:bg-ink/5 hover:text-ink"
                  aria-label="Close modal"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="px-5 py-5">{children}</div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}