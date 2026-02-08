"use client";

import { motion } from "framer-motion";
import { Bookmark, ExternalLink, Heart } from "lucide-react";
import type { Idea } from "./IdeaGrid";

export function IdeaCard({ idea }: { idea: Idea }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={idea.image_url || ""}
          alt={idea.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          onError={(e) => {
            // fallback if the image blocks hotlinking
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
          referrerPolicy="no-referrer"
        />

        <div className="absolute right-3 top-3 flex gap-2">
          {idea.link_url ? (
            <a
              href={idea.link_url}
              target="_blank"
              rel="noreferrer"
              className="grid h-9 w-9 place-items-center rounded-xl bg-white/90 shadow-sm hover:bg-white"
              aria-label="Open link"
            >
              <ExternalLink size={16} />
            </a>
          ) : null}

          <button className="grid h-9 w-9 place-items-center rounded-xl bg-white/90 shadow-sm hover:bg-white">
            <Bookmark size={16} />
          </button>
          <button className="grid h-9 w-9 place-items-center rounded-xl bg-white/90 shadow-sm hover:bg-white">
            <Heart size={16} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 text-sm font-semibold">{idea.title}</h3>
        {idea.note ? (
          <p className="mt-1 line-clamp-2 text-xs text-neutral-600">{idea.note}</p>
        ) : (
          <p className="mt-1 text-xs text-neutral-400">No reflection yet</p>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          {(idea.tags || []).map((t) => (
            <span
              key={t}
              className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-700"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
