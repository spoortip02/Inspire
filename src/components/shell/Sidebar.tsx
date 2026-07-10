import { FolderHeart, LayoutGrid, NotebookPen, Wand2 } from "lucide-react";

const items = [
  { label: "For You", icon: LayoutGrid },
  { label: "Thoughts", icon: NotebookPen }, // new: a writing surface, not just saved links
  { label: "Boards", icon: FolderHeart },
  { label: "Mood AI", icon: Wand2 },
];

export function Sidebar() {
  return (
    <aside className="rounded-md bg-card p-4 shadow-[3px_4px_0_rgba(33,30,26,0.06)] ring-1 ring-ink/10">
      <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink/45">
        Navigation
      </p>

      <nav className="space-y-1">
        {items.map((it) => (
          <button
            key={it.label}
            className="flex w-full items-center gap-3 rounded-sm px-2 py-2 text-sm font-medium text-ink/75 transition hover:bg-ink/5 hover:text-ink"
          >
            <it.icon size={17} strokeWidth={1.75} className="text-ink/45" />
            {it.label}
          </button>
        ))}
      </nav>

      <div className="relative mt-6 -rotate-1 rounded-sm border border-dashed border-poppy/40 bg-poppy/[0.06] p-3">
        <span className="absolute left-1/2 top-0 h-3 w-8 -translate-x-1/2 -translate-y-1/2 rotate-1 bg-card shadow-sm" />
        <p className="font-serif text-sm font-semibold text-ink">Today's vibe</p>
        <p className="mt-1 text-xs leading-5 text-ink/60">
          Write down or save 2-3 things that match how you want to feel this week.
        </p>
      </div>
    </aside>
  );
}