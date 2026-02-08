import { FolderHeart, LayoutGrid, Wand2 } from "lucide-react";

const items = [
  { label: "For You", icon: LayoutGrid },
  { label: "Boards", icon: FolderHeart },
  { label: "Mood AI", icon: Wand2 },
];

export function Sidebar() {
  return (
    <aside className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-neutral-200">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
        Navigation
      </p>

      <nav className="space-y-1">
        {items.map((it) => (
          <button
            key={it.label}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
          >
            <it.icon size={18} className="text-neutral-500" />
            {it.label}
          </button>
        ))}
      </nav>

      <div className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50 p-3">
        <p className="text-sm font-semibold">Today’s vibe</p>
        <p className="mt-1 text-xs text-neutral-600">
          Save 2–3 ideas that match how you want to feel this week.
        </p>
      </div>
    </aside>
  );
}
