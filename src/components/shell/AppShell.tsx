import { AssistantSuggestionsProvider } from "@/components/assistant/assisstant-suggestions-context";
import { AssistantWidget } from "@/components/assistant/AssistantWidget";
import { PropsWithChildren } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <AssistantSuggestionsProvider>
      <div className="min-h-screen">
        <Header />

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 pb-10 pt-6 md:grid-cols-[240px_1fr]">
          <Sidebar />
          <main className="rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200">
            {children}
          </main>
        </div>

        <AssistantWidget />
      </div>
    </AssistantSuggestionsProvider>
  );
}
