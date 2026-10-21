import { useEffect, useState } from "react";

import { useConversationEvents } from "@/hooks/api";
import { getState, getStoredConversationId } from "@/services/conversationsService";
import type { SalesState, WorkflowEventMessage } from "@/types/sales";

interface UseWorkflowGraphViewResult {
  conversationId: number | null;
  salesState: SalesState | null;
  events: WorkflowEventMessage[];
}

export function useWorkflowGraphView(): UseWorkflowGraphViewResult {
  const [conversationId] = useState(() => getStoredConversationId());
  const [salesState, setSalesState] = useState<SalesState | null>(null);

  const { events } = useConversationEvents(conversationId);

  useEffect(() => {
    if (conversationId === null) return;

    getState(conversationId)
      .then(setSalesState)
      .catch(() => {
        // Best-effort — the inspector just shows nothing new until the next event.
      });
  }, [conversationId, events.length]);

  return { conversationId, salesState, events };
}
