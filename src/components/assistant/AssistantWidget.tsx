"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X } from "lucide-react";
import { useAssistantSuggestions } from "@/components/assistant/assistant-suggestions-context";
import { InspireMark } from "@/components/ui/InspireMark";

type ChatMsg = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const quickActions = [
  { label: "Suggest ideas for my mood", prompt: "Suggest 6 ideas for a cozy, calm mood." },
  { label: "Ask me questions", prompt: "Ask me 5 questions to understand my taste and mood." },
  { label: "Help me organize", prompt: "Suggest 3 boards I should create based on my interests." },
];

export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState<string>("START");
  const { setSuggestedIdeas } = useAssistantSuggestions();
  useEffect(() => {
    const savedStage = window.localStorage.getItem("inspire_stage");
    if (savedStage) {
      setStage(savedStage);
    }
  }, []);

  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Hi Spoorti — I'm your Inspire buddy. Tell me your mood or what you're searching for, and I'll suggest ideas + boards.",
    },
  ]);

  const listRef = useRef<HTMLDivElement | null>(null);

  // Auto-open + auto-send message from WelcomeOverlay
  useEffect(() => {
    const pending = localStorage.getItem("inspire_pending_message");
    if (!pending) return;

    setOpen(true);

    setTimeout(() => {
      send(pending);
      localStorage.removeItem("inspire_pending_message");
    }, 150);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => listRef.current?.scrollTo({ top: 999999, behavior: "smooth" }), 50);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMsg = { id: crypto.randomUUID(), role: "user", content: trimmed };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const historyForApi = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: historyForApi,
          stage,
        }),
      });

      const data = await res.json();
      if (data?.nextStage) {
        setStage(data.nextStage);
        localStorage.setItem("inspire_stage", String(data.nextStage));
      }

      if (Array.isArray(data?.ideas)) {
        setSuggestedIdeas(
          data.ideas.map((it: any) => ({
            id: crypto.randomUUID(),
            title: String(it.title ?? "Idea"),
            image_url: String(it.image_url ?? ""),
            reason: String(it.reason ?? ""),
            tags: Array.isArray(it.tags) ? it.tags.map(String) : [],
          }))
        );
      }

      const assistantMsg: ChatMsg = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data?.reply ?? "Hmm, I couldn't think of anything. Try again?",
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Oops — something failed. Try again in a second.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating trigger */}
      <div className="fixed bottom-5 right-5 z-50">
        <motion.button
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setOpen((v) => !v)}
          className="relative grid h-14 w-14 place-items-center rounded-md bg-ink shadow-[3px_4px_0_rgba(33,30,26,0.25)]"
          aria-label="Open Inspire Assistant"
          title="Inspire Assistant"
        >
          <InspireMark size={26} />
        </motion.button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed bottom-24 right-5 z-50 w-[360px] overflow-hidden rounded-md border border-ink/10 bg-card shadow-[5px_6px_0_rgba(33,30,26,0.1)]"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <InspireMark size={30} />
                <div>
                  <p className="font-serif text-sm font-semibold leading-4 text-ink">
                    Inspire Buddy
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-wide text-ink/45">
                    mood → ideas → boards
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-sm text-ink/50 transition hover:bg-ink/5 hover:text-ink"
                aria-label="Close assistant"
              >
                <X size={17} />
              </button>
            </div>

            {/* Quick actions */}
            <div className="flex flex-wrap gap-2 border-b border-ink/10 bg-ink/[0.02] px-4 py-3">
              {quickActions.map((q) => (
                <button
                  key={q.label}
                  onClick={() => send(q.prompt)}
                  className="rounded-sm border border-ink/15 bg-card px-2.5 py-1.5 font-mono text-[11px] text-ink/70 transition hover:border-cobalt/40 hover:text-cobalt"
                >
                  {q.label}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div ref={listRef} className="max-h-[340px] space-y-3 overflow-auto px-4 py-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-sm px-3 py-2 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-ink text-paper"
                        : "border border-ink/10 bg-paper text-ink"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-sm border border-ink/10 bg-paper px-3 py-2 font-mono text-xs text-ink/60">
                    thinking…
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-ink/10 px-4 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for ideas, moods, boards..."
                className="w-full border-b border-ink/15 bg-transparent px-1 py-2 font-mono text-sm text-ink outline-none placeholder:text-ink/35 focus:border-cobalt"
              />
              <button
                type="submit"
                disabled={loading}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-sm bg-ink text-paper transition hover:bg-cobalt disabled:opacity-50"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}