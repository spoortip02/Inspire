"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { IdeaGrid, type Idea } from "@/components/ideas/IdeaGrid";
import { NewBoardModal } from "@/components/boards/NewBoardModal";
import { SaveIdeaModal } from "@/components/ideas/SaveIdeaModal";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [openBoard, setOpenBoard] = useState(false);
  const [openIdea, setOpenIdea] = useState(false);

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

  return (
    <AppShell>
      <div className="px-5 py-6">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Inspire</h1>
            <p className="mt-1 text-sm text-neutral-600">
              Save ideas. Organize them into boards. Add reflections that make them
              yours.
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

        <IdeaGrid ideas={ideas} />
      </div>

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
    </AppShell>
  );
}
