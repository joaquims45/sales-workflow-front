import { useEffect, useState } from "react";

import { useConversationEvents } from "@/hooks/api";
import { getState, getStoredConversationId } from "@/services/conversationsService";
import type { SalesState } from "@/types/sales";

interface UseSalesStateResult {
  conversationId: number | null;
  salesState: SalesState | null;
  error: string | null;
}

export function useSalesState(): UseSalesStateResult {
  const [conversationId] = useState(() => getStoredConversationId());
  const [salesState, setSalesState] = useState<SalesState | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Events carry only what changed (e.g. {decision, confidence}); the full
  // structured state always comes from the REST endpoint. WS here is just
  // the "something changed, go refetch" signal.
  const { events } = useConversationEvents(conversationId);

  useEffect(() => {
    if (conversationId === null) return;

    getState(conversationId)
      .then(setSalesState)
      .catch(() => setError("No pudimos cargar el estado de la conversación."));
  }, [conversationId, events.length]);

  return { conversationId, salesState, error };
}
