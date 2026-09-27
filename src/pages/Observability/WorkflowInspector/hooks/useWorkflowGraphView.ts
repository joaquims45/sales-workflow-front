import { useEffect, useState } from "react";

import { useConversationEvents } from "@/hooks/api";
import { getState, getStoredConversationId } from "@/services/conversationsService";
import type { SalesState, WorkflowEventMessage } from "@/types/sales";

interface UseWorkflowGraphViewResult {
  conversationId: number | null;
  salesState: SalesState | null;
  isShippingActive: boolean;
  events: WorkflowEventMessage[];
}

export function useWorkflowGraphView(): UseWorkflowGraphViewResult {
  const [conversationId] = useState(() => getStoredConversationId());
  const [salesState, setSalesState] = useState<SalesState | null>(null);
  const [isShippingActive, setIsShippingActive] = useState(false);

  const { events } = useConversationEvents(conversationId);

  useEffect(() => {
    if (conversationId === null) return;

    getState(conversationId)
      .then(setSalesState)
      .catch(() => {
        // Best-effort — the inspector just shows nothing new until the next event.
      });
  }, [conversationId, events.length]);

  useEffect(() => {
    const latest = events.at(-1);
    if (!latest) return;

    // These are momentary: SHIPPING_QUERY suspends/resumes within the same
    // turn, so REST state never shows "suspended" — only the live event does.
    if (latest.event_type === "workflow.suspended") setIsShippingActive(true);
    if (latest.event_type === "workflow.resumed") setIsShippingActive(false);
  }, [events]);

  return { conversationId, salesState, isShippingActive, events };
}
