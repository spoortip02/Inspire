import { InspireMark } from "@/components/ui/InspireMark";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <InspireMark size={34} />
          <div>
            <p className="font-serif text-base font-semibold leading-4 text-ink">Inspire</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-ink/45">
              thoughts &amp; things worth keeping
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <input
            placeholder="Search thoughts, ideas, boards..."
            className="hidden w-72 border-b border-ink/20 bg-transparent px-1 py-2 font-mono text-sm text-ink outline-none placeholder:text-ink/35 focus:border-cobalt md:block"
          />
          <button className="font-mono text-xs uppercase tracking-wider text-ink/60 underline decoration-dotted underline-offset-4 transition hover:text-ink">
            Sign in
          </button>
        </div>
      </div>
    </header>
  );
}