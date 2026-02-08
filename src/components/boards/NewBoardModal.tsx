"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

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
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-neutral-700">Board name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Cozy room ideas"
            className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900/20"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-neutral-700">Description (optional)</label>
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="What’s this board for?"
            className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900/20"
          />
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <button
            onClick={onClose}
            className="rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-100"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Create
          </button>
        </div>
      </div>
    </Modal>
  );
}
