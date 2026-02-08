import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-neutral-900 text-white">
            <Sparkles size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold leading-4">Inspire</p>
            <p className="text-xs text-neutral-500">Visual idea journal</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            placeholder="Search ideas, boards..."
            className="hidden w-72 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900/20 md:block"
          />
          <button className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-medium hover:bg-neutral-100">
            Sign in
          </button>
        </div>
      </div>
    </header>
  );
}
