"use client";

import { useMemo, useState } from "react";
import { Modal } from "@/components/ui/Modal";

function normalizeUnsplashToImageUrl(input: string) {
  const url = input.trim();

  // If user pasted an Unsplash photo page, convert it to the "source" image endpoint.
  // Example:
  // https://unsplash.com/photos/abc123  -> https://source.unsplash.com/abc123/1200x900
  const match = url.match(/^https:\/\/unsplash\.com\/photos\/([A-Za-z0-9_-]+)/);
  if (match?.[1]) {
    const id = match[1];
    return `https://source.unsplash.com/${id}/1200x900`;
  }

  return url;
}

export function SaveIdeaModal({
  open,
  onClose,
  boards,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  boards: { id: string; name: string }[];
  onSave: (idea: {
    title: string;
    image_url?: string;
    link_url?: string;
    note?: string;
    board_id?: string;
    tags: string[];
  }) => void;
}) {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [note, setNote] = useState("");
  const [boardId, setBoardId] = useState<string>("");
  const [tagsText, setTagsText] = useState("");

  const tags = useMemo(() => {
    return tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 10);
  }, [tagsText]);

  function handleSave() {
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    const img = imageUrl.trim();
    const link = linkUrl.trim();

    // Require at least one source
    if (!img && !link) return;

    // If user pasted an unsplash page into image field, normalize it.
    const normalizedImage = img ? normalizeUnsplashToImageUrl(img) : undefined;

    onSave({
      title: cleanTitle,
      image_url: normalizedImage || undefined,
      link_url: link || (img.startsWith("https://unsplash.com/photos/") ? img : undefined),
      note: note.trim() || undefined,
      board_id: boardId || undefined,
      tags,
    });

    setTitle("");
    setImageUrl("");
    setLinkUrl("");
    setNote("");
    setBoardId("");
    setTagsText("");
    onClose();
  }

  return (
    <Modal open={open} title="Save a new idea" onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-neutral-700">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Snowy night mood"
            className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900/20"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-neutral-700">
              Image URL (can paste Unsplash photo link too)
            </label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images... OR https://unsplash.com/photos/..."
              className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900/20"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-700">Link URL (optional)</label>
            <input
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://..."
              className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900/20"
            />
          </div>
        </div>

        <p className="text-xs text-neutral-500">
          If you paste an Unsplash photo page, we’ll auto-convert it into a renderable image.
        </p>

        <div>
          <label className="text-xs font-medium text-neutral-700">
            Reflection (why it matters)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write a personal note…"
            rows={3}
            className="mt-2 w-full resize-none rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900/20"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-neutral-700">Board</label>
            <select
              value={boardId}
              onChange={(e) => setBoardId(e.target.value)}
              className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900/20"
            >
              <option value="">No board</option>
              {boards.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-700">
              Tags (comma separated)
            </label>
            <input
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              placeholder="cozy, night, mountains"
              className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900/20"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <button
            onClick={onClose}
            className="rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}
