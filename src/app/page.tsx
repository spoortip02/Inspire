"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { IdeaGrid, type Idea } from "@/components/ideas/IdeaGrid";
import { NewBoardModal } from "@/components/boards/NewBoardModal";
import { SaveIdeaModal } from "@/components/ideas/SaveIdeaModal";
import { supabase } from "@/lib/supabaseClient";
import { useAssistantSuggestions } from "@/components/assistant/assistant-suggestions-context";
import { WelcomeOverlay } from "@/components/assistant/WelcomeOverlay";

function SuggestedSection({
  onSaveSuggestion,
}: {
  onSaveSuggestion: (s: {
    title: string;
    image_url: string;
    note?: string;
    tags: string[];
  }) => Promise<void>;
}) {
  const { suggestedIdeas, setSuggestedIdeas, clearSuggestions } = useAssistantSuggestions();

  if (!suggestedIdeas.length) return null;

  return (
    <div className="mb-6 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold">✨ Suggested for you</h2>
          <p className="mt-1 text-xs text-neutral-600">
            These are AI suggestions. Save the ones you like.
          </p>
        </div>

        <button
          onClick={clearSuggestions}
          className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-medium hover:bg-neutral-100"
        >
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {suggestedIdeas.map((s) => (
          <div key={s.id} className="overflow-hidden rounded-2xl border border-neutral-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.image_url} alt={s.title} className="aspect-[4/3] w-full object-cover" />

            <div className="p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold">{s.title}</p>
                  {s.reason ? (
                    <p className="mt-1 text-xs text-neutral-600 line-clamp-2">{s.reason}</p>
                  ) : null}
                </div>

                <span className="shrink-0 rounded-full bg-neutral-100 px-2 py-1 text-[11px] font-medium text-neutral-700">
                  AI
                </span>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-700"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex justify-end gap-2">
                <button
                  onClick={() =>
                    setSuggestedIdeas((prev) => prev.filter((x) => x.id !== s.id))
                  }
                  className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-medium hover:bg-neutral-100"
                >
                  Dismiss
                </button>

                <button
                  onClick={async () => {
                    await onSaveSuggestion({
                      title: s.title,
                      image_url: s.image_url,
                      note: s.reason,
                      tags: s.tags,
                    });
                    setSuggestedIdeas((prev) => prev.filter((x) => x.id !== s.id));
                  }}
                  className="rounded-xl bg-neutral-900 px-3 py-2 text-xs font-medium text-white hover:bg-neutral-800"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HomeInner() {
  const [openBoard, setOpenBoard] = useState(false);
  const [openIdea, setOpenIdea] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

useEffect(() => {
  const seen = localStorage.getItem("inspire_seen_welcome");
  if (!seen) setShowWelcome(true);
}, []);


  const [boards, setBoards] = useState<{ id: string; name: string }[]>([]);
  const [ideas, setIdeas] = useState<Idea[]>([]);

  async function fetchBoards() {
    const { data, error } = await supabase
      .from("boards")
      .select("id, name")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching boards:", error);
      return;
    }
    setBoards(data || []);
  }

  async function fetchIdeas() {
    const { data, error } = await supabase
      .from("ideas")
      .select("id, title, image_url, link_url, note, tags, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching ideas:", error);
      return;
    }
    setIdeas((data || []) as Idea[]);
  }

  async function handleCreateBoard(board: { name: string; description?: string }) {
    const { error } = await supabase.from("boards").insert([
      { name: board.name, description: board.description },
    ]);

    if (error) {
      console.error("Error creating board:", error);
      alert("Failed to create board");
      return;
    }

    fetchBoards();
  }

  async function handleSaveIdea(idea: {
    title: string;
    image_url?: string;
    link_url?: string;
    note?: string;
    board_id?: string;
    tags: string[];
  }) {
    const { error } = await supabase.from("ideas").insert([
      {
        title: idea.title,
        image_url: idea.image_url ?? null,
        link_url: idea.link_url ?? null,
        note: idea.note ?? null,
        board_id: idea.board_id ?? null,
        tags: idea.tags ?? [],
      },
    ]);

    if (error) {
      console.error("Error saving idea:", error);
      alert("Failed to save idea");
      return;
    }

    fetchIdeas();
  }

  useEffect(() => {
    fetchBoards();
    fetchIdeas();
  }, []);
  useEffect(() => {
  if (openIdea) fetchBoards();
}, [openIdea]);


  return (
  <>
    {showWelcome && (
      <WelcomeOverlay
        onSkip={() => {
          localStorage.setItem("inspire_seen_welcome", "1");
          setShowWelcome(false);
        }}
        onStart={(message) => {
          localStorage.setItem("inspire_seen_welcome", "1");
          setShowWelcome(false);
          console.log("First message:", message);
        }}
      />
    )}

    <div className="px-5 py-6">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Inspire</h1>
          <p className="mt-1 text-sm text-neutral-600">
            Save ideas. Organize them into boards. Add reflections that make them yours.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setOpenBoard(true)}
            className="rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-100"
          >
            New Board
          </button>
          <button
            onClick={() => setOpenIdea(true)}
            className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Save Idea
          </button>
        </div>
      </div>

      <SuggestedSection
        onSaveSuggestion={async (s) => {
          await handleSaveIdea({
            title: s.title,
            image_url: s.image_url,
            note: s.note,
            tags: s.tags,
          });
        }}
      />

      <IdeaGrid ideas={ideas} />

      <NewBoardModal
        open={openBoard}
        onClose={() => setOpenBoard(false)}
        onCreate={handleCreateBoard}
      />

      <SaveIdeaModal
        open={openIdea}
        onClose={() => setOpenIdea(false)}
        boards={boards}
        onSave={handleSaveIdea}
      />
    </div>
  </>
);
}

export default function Home() {
  return (
    <AppShell>
      <HomeInner />
    </AppShell>
  );
}
