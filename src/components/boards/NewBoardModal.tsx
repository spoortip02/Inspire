"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

const inputClass =
  "w-full border-b border-ink/15 bg-transparent px-1 py-2 text-sm text-ink outline-none placeholder:text-ink/35 focus:border-cobalt transition-colors";

export function NewBoardModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (board: { name: string; description?: string }) => void;
}) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  function handleCreate() {
    if (!name.trim()) return;
    onCreate({ name: name.trim(), description: desc.trim() || undefined });
    setName("");
    setDesc("");
    onClose();
  }

  return (
    <Modal open={open} title="Create a new board" onClose={onClose}>
      <div className="space-y-5">
        <div>
          <label className="font-mono text-[11px] uppercase tracking-wide text-ink/50">
            Board name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Cozy room ideas"
            className={`${inputClass} mt-1.5`}
          />
        </div>

        <div>
          <label className="font-mono text-[11px] uppercase tracking-wide text-ink/50">
            Description (optional)
          </label>
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="What's this board for?"
            className={`${inputClass} mt-1.5`}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="font-mono text-xs uppercase tracking-wider text-ink/50 underline decoration-dotted underline-offset-4 transition hover:text-ink"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="rounded-sm bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-cobalt"
          >
            Create
          </button>
        </div>
      </div>
    </Modal>
  );
}