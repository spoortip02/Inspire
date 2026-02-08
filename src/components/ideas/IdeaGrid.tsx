import { IdeaCard } from "./IdeaCard";

export type Idea = {
  id: string;
  title: string;
  image_url: string | null;
  link_url: string | null;
  note: string | null;
  tags: string[];
  created_at: string;
};

export function IdeaGrid({ ideas }: { ideas: Idea[] }) {
  if (!ideas.length) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-200 bg-white p-10 text-center">
        <p className="text-sm font-semibold">No ideas yet</p>
        <p className="mt-1 text-sm text-neutral-600">
          Click <span className="font-medium">Save Idea</span> to add your first one.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
    </div>
  );
}
