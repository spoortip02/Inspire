import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Stage = "START" | "ASK_VIBE" | "ASK_INTERESTS" | "ASK_GOAL" | "DONE";

function getStage(): Stage {
  // stored on client; server will receive it
  return "START";
}

function parseCSVish(input: string) {
  return input
    .split(/[,/]/g)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 8);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const message = String(body?.message ?? "").trim();
  const stage = String(body?.stage ?? "START") as Stage;

  // 1) ensure single profile row exists (dev mode)
  // we keep a single profile for now (no auth yet)
  const { data: existing } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(1);

  let profile = existing?.[0];

  if (!profile) {
    const { data: created } = await supabase
      .from("profiles")
      .insert([{ display_name: "Spoorti" }])
      .select("*")
      .single();
    profile = created;
  }

  // 2) conversation stages
  if (stage === "START") {
    return NextResponse.json({
      reply:
        "Hey Spoorti 💗 I’m here. Before I suggest anything, tell me: what vibe do you want right now? (cozy / bold / minimal / dreamy / productive)",
      nextStage: "ASK_VIBE",
    });
  }

  if (stage === "ASK_VIBE") {
    const vibe = message.toLowerCase().slice(0, 30);
    await supabase.from("profiles").update({ vibe }).eq("id", profile.id);

    return NextResponse.json({
      reply:
        `Got it — ${vibe}. What are you into right now? (UI, fashion, room setup, study, travel, fitness, F1… type 3–6 words)`,
      nextStage: "ASK_INTERESTS",
    });
  }

  if (stage === "ASK_INTERESTS") {
    const interests = parseCSVish(message);
    await supabase.from("profiles").update({ interests }).eq("id", profile.id);

    return NextResponse.json({
      reply:
        "Nice. What do you want to get out of Inspire today? (ex: find ideas for a project / build a board / feel motivated / learn UI)",
      nextStage: "ASK_GOAL",
    });
  }

  if (stage === "ASK_GOAL") {
    await supabase.from("profiles").update({ goals: message }).eq("id", profile.id);

    // simple personalized suggestions (no OpenAI yet)
    const ideas = [
      {
        title: `${profile?.vibe ?? "cozy"} moodboard starter`,
        image_url:
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&auto=format&fit=crop",
        reason: "Start with one anchor image and build around it.",
        tags: [profile?.vibe ?? "vibe", ...(profile?.interests ?? []).slice(0, 2)],
      },
      {
        title: "Clean UI section inspiration",
        image_url:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop",
        reason: "Great references for spacing, type scale, and layout.",
        tags: ["ui", "layout", "clean"],
      },
    ];

    return NextResponse.json({
      reply:
        "Perfect. I’ll tailor suggestions to that. I dropped a few ideas above — save what feels right. Want me to also suggest 3 boards for you?",
      nextStage: "DONE",
      ideas,
    });
  }

  // DONE: conversational follow-ups
  // Here we can keep it simple: reflect + propose next action
  return NextResponse.json({
    reply:
      "Tell me what you’re feeling right now (or paste a link/image idea), and I’ll suggest ideas + boards based on your vibe and interests.",
    nextStage: "DONE",
  });
}