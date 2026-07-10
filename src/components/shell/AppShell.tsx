import { AssistantSuggestionsProvider } from "@/components/assistant/assistant-suggestions-context";
import { AssistantWidget } from "@/components/assistant/AssistantWidget";
import { PropsWithChildren } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <AssistantSuggestionsProvider>
      <div className="min-h-screen bg-paper">
        <Header />

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 pb-10 pt-6 md:grid-cols-[240px_1fr]">
          <Sidebar />
          <main className="rounded-md bg-card shadow-[3px_4px_0_rgba(33,30,26,0.06)] ring-1 ring-ink/10">
            {children}
          </main>
        </div>

        <AssistantWidget />
      </div>
    </AssistantSuggestionsProvider>
  );
}