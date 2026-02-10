"use client";

import { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";

export type SuggestedIdea = {
  id: string;
  title: string;
  image_url: string;
  reason: string;
  tags: string[];
};

type Ctx = {
  suggestedIdeas: SuggestedIdea[];
  setSuggestedIdeas: React.Dispatch<React.SetStateAction<SuggestedIdea[]>>;
  clearSuggestions: () => void;
};

const SuggestionsContext = createContext<Ctx | null>(null);

export function AssistantSuggestionsProvider({ children }: PropsWithChildren) {
  const [suggestedIdeas, setSuggestedIdeas] = useState<SuggestedIdea[]>([]);

  const value = useMemo(
    () => ({
      suggestedIdeas,
      setSuggestedIdeas,
      clearSuggestions: () => setSuggestedIdeas([]),
    }),
    [suggestedIdeas]
  );

  return <SuggestionsContext.Provider value={value}>{children}</SuggestionsContext.Provider>;
}

export function useAssistantSuggestions() {
  const ctx = useContext(SuggestionsContext);
  if (!ctx) throw new Error("useAssistantSuggestions must be used within AssistantSuggestionsProvider");
  return ctx;
}
