"use client";

import { motion } from "framer-motion";
import { Bookmark, ExternalLink, Heart } from "lucide-react";
import type { Idea } from "./IdeaGrid";

type Props = {
  idea: Idea;
  onSave?: (idea: Idea) => void;
  showSave?: boolean;
};

export function IdeaCard({ idea, onSave, showSave = false }: Props) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group overflow-hidden rounded-md border border-ink/10 bg-card shadow-[3px_4px_0_rgba(33,30,26,0.06)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={idea.image_url || ""}
          alt={idea.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          onError={(e) => {
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
              className="grid h-8 w-8 place-items-center rounded-sm bg-card/90 text-ink shadow-sm transition hover:text-cobalt"
              aria-label="Open link"
            >
              <ExternalLink size={15} />
            </a>
          ) : null}

          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-sm bg-card/90 text-ink shadow-sm transition hover:text-cobalt"
            aria-label="Bookmark"
          >
            <Bookmark size={15} />
          </button>

          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-sm bg-card/90 text-ink shadow-sm transition hover:text-poppy"
            aria-label="Like"
          >
            <Heart size={15} />
          </button>
        </div>

        {showSave && onSave ? (
          <div className="absolute bottom-3 right-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSave(idea);
              }}
              className="rounded-sm bg-ink px-3 py-1.5 text-xs font-medium text-paper shadow-sm transition hover:bg-cobalt"
            >
              Save
            </button>
          </div>
        ) : null}
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 font-serif text-sm font-semibold text-ink">{idea.title}</h3>

        {idea.note ? (
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-ink/60">{idea.note}</p>
        ) : (
          <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-ink/30">
            no reflection yet
          </p>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          {(idea.tags || []).map((t) => (
            <span
              key={t}
              className="rounded-sm border border-ink/10 bg-paper px-2 py-1 font-mono text-[10px] text-ink/60"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}