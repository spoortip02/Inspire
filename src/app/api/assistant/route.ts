import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const msg = (body?.message ?? "").toString().toLowerCase();

  let reply =
    "Tell me a mood (cozy, bold, minimal, productive) or a theme (workspace, outfits, UI, travel) and I’ll suggest ideas + boards.";

  if (msg.includes("cozy")) {
    reply =
      "Cozy ideas: 1) warm lamp + desk setup, 2) beige UI palette, 3) café playlist + study corner, 4) knit textures moodboard, 5) journaling prompts, 6) soft lighting photography.\n\nWant me to create 3 boards for this vibe?";
  } else if (msg.includes("ask") && msg.includes("question")) {
    reply =
      "Okay — 5 quick questions:\n1) Do you want calm or energetic vibes?\n2) Are you saving for design, life, or career?\n3) What 3 words describe your ideal aesthetic?\n4) Minimal or maximal?\n5) What do you want to feel after scrolling your boards?";
  } else if (msg.includes("board")) {
    reply =
      "Board ideas you’ll actually use:\n• Mood: Cozy & Calm\n• UI: Beige + Clean Design\n• Life: Little Habits That Fix Everything\n\nTell me your top 2 interests and I’ll tailor board names.";
  }

  return NextResponse.json({ reply });
}
