import { NextResponse } from "next/server";

type Action =
  | { type: "CREATE_BOARD"; name: string }
  | { type: "CLEAR_SUGGESTIONS" }
  | null;

function extractBoardName(message: string) {
  const m = message.trim();

  // If user uses quotes: create board "Cozy Corners"
  const quoted = m.match(/"([^"]+)"/);
  if (quoted?.[1]) return quoted[1].trim();

  // Try common phrasing patterns
  const patterns = [
    /create (?:a )?board(?: called)? (.+)$/i,
    /make (?:a )?board(?: called)? (.+)$/i,
    /new board (.+)$/i,
  ];

  for (const p of patterns) {
    const match = m.match(p);
    if (match?.[1]) return match[1].trim();
  }

  return "";
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const raw = String(body?.message ?? "").trim();
  const msg = raw.toLowerCase();

  let reply =
    'Tell me a mood (cozy, bold, minimal) or say: create board "Cozy Corners".';

  let ideas: any[] = [];
  let action: Action = null;

  // -----------------------------
  // 1) Action: Clear suggestions
  // -----------------------------
  if (msg.includes("clear suggestions") || msg === "clear" || msg.includes("remove suggestions")) {
    reply = "Done ✅ I cleared the suggestions section.";
    action = { type: "CLEAR_SUGGESTIONS" };
    return NextResponse.json({ reply, action });
  }

  // -----------------------------
  // 2) Action: Create board
  // -----------------------------
  if (
    msg.includes("create board") ||
    msg.includes("make board") ||
    msg.includes("new board") ||
    msg.includes("create a board")
  ) {
    const name = extractBoardName(raw);

    if (name) {
      reply = `I can create a board called “${name}”. Want me to do it?`;
      action = { type: "CREATE_BOARD", name };
      return NextResponse.json({ reply, action });
    }

    reply = 'Sure — what should the board be called? Example: create board "Cozy Corners"';
    return NextResponse.json({ reply });
  }

  // -----------------------------
  // 3) Suggestions: Cozy mood
  // -----------------------------
  if (msg.includes("cozy")) {
    reply =
      "Here are cozy, calm ideas. I put them in ✨ Suggested for you above your saved pins.";

    ideas = [
      {
        title: "Warm desk corner lighting",
        image_url:
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&auto=format&fit=crop",
        reason: "Warm light makes a space feel safe and helps you focus longer.",
        tags: ["cozy", "workspace", "warm"],
      },
      {
        title: "Soft beige UI palette",
        image_url:
          "https://images.unsplash.com/photo-1526481280695-3c687fd5432c?w=1200&auto=format&fit=crop",
        reason: "Neutral palettes feel calm and premium (great for minimalist UI).",
        tags: ["ui", "palette", "minimal"],
      },
      {
        title: "Cozy café mood corner",
        image_url:
          "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200&auto=format&fit=crop",
        reason: "Textures + ambient light = instant comfort and productivity.",
        tags: ["mood", "cozy", "lighting"],
      },
      {
        title: "Minimal cozy bedroom vibe",
        image_url:
          "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1200&auto=format&fit=crop",
        reason: "Clean space reduces mental clutter and improves sleep quality.",
        tags: ["home", "cozy", "minimal"],
      },
      {
        title: "Soft knit textures moodboard",
        image_url:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop",
        reason: "Textures are an easy shortcut to make designs and spaces feel warm.",
        tags: ["textures", "cozy", "aesthetic"],
      },
    ];

    return NextResponse.json({ reply, ideas });
  }

  // -----------------------------
  // Default response
  // -----------------------------
  return NextResponse.json({ reply, ideas });
}
