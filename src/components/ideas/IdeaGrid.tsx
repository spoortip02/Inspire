"use client";

import { IdeaCard } from "./IdeaCard";

export type Idea = {
  id: string;
  title: string;
  image_url?: string | null;
  link_url?: string | null;
  note?: string | null;
  tags?: string[] | null;
  created_at?: string;
};

type Props = {
  ideas: Idea[];
  onSaveIdea?: (idea: Idea) => void;
  showSave?: boolean;
};

export function IdeaGrid({ ideas, onSaveIdea, showSave = false }: Props) {
  if (!ideas || ideas.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-ink/15 bg-paper/40 p-10 text-center">
        <p className="font-serif text-base font-semibold text-ink">Nothing here yet</p>
        <p className="mx-auto mt-1.5 max-w-xs text-sm leading-6 text-ink/55">
          Write down a thought or{" "}
          <span className="font-medium text-ink">save an idea</span> — either one is a good
          place to start.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} onSave={onSaveIdea} showSave={showSave} />
      ))}
    </div>
  );
}