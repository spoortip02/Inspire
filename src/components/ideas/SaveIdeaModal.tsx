"use client";

import { useMemo, useState } from "react";
import { Modal } from "@/components/ui/Modal";

function normalizeUnsplashToImageUrl(input: string) {
  const url = input.trim();
  const match = url.match(/^https:\/\/unsplash\.com\/photos\/([A-Za-z0-9_-]+)/);
  if (match?.[1]) {
    const id = match[1];
    return `https://source.unsplash.com/${id}/1200x900`;
  }
  return url;
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="font-mono text-[11px] uppercase tracking-wide text-ink/50">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {hint ? <p className="mt-1.5 text-xs text-ink/45">{hint}</p> : null}
    </div>
  );
}

const inputClass =
  "w-full border-b border-ink/15 bg-transparent px-1 py-2 text-sm text-ink outline-none placeholder:text-ink/35 focus:border-cobalt transition-colors";

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
    if (!img && !link) return;

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
      <div className="space-y-5">
        <Field label="Title">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Snowy night mood"
            className={inputClass}
          />
        </Field>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Image URL" hint="Unsplash photo links are converted automatically.">
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images... or unsplash.com/photos/..."
              className={inputClass}
            />
          </Field>

          <Field label="Link (optional)">
            <input
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://..."
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Reflection — why it matters">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write a personal note..."
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </Field>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Board">
            <select
              value={boardId}
              onChange={(e) => setBoardId(e.target.value)}
              className={`${inputClass} appearance-none bg-card`}
            >
              <option value="">No board</option>
              {boards.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Tags" hint="comma separated">
            <input
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              placeholder="cozy, night, mountains"
              className={inputClass}
            />
          </Field>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="font-mono text-xs uppercase tracking-wider text-ink/50 underline decoration-dotted underline-offset-4 transition hover:text-ink"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-sm bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-cobalt"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}