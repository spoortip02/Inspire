import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const msg = String(body?.message ?? "").toLowerCase();

  // Default reply
  let reply =
    "Tell me a mood (cozy, bold, minimal, productive) or a theme (workspace, outfits, UI, travel). I’ll suggest ideas and show them on the page.";

  let ideas: any[] = [];

  if (msg.includes("cozy")) {
    reply = "Here are cozy, calm ideas. I’ve put them in ✨ Suggested for you above your saved pins.";
    ideas = [
      {
        title: "Warm desk corner lighting",
        image_url:
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&auto=format&fit=crop",
        reason: "Warm light makes a space feel safe + focused.",
        tags: ["cozy", "workspace", "warm"],
      },
      {
        title: "Soft beige UI palette",
        image_url:
          "https://images.unsplash.com/photo-1526481280695-3c687fd5432c?w=1200&auto=format&fit=crop",
        reason: "Neutral palettes feel calm and premium.",
        tags: ["ui", "palette", "minimal"],
      },
      {
        title: "Cozy café vibe",
        image_url:
          "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200&auto=format&fit=crop",
        reason: "Café lighting + textures = comfort + productivity.",
        tags: ["mood", "cozy", "lighting"],
      },
    ];
  }

  return NextResponse.json({ reply, ideas });
}
