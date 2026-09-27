import { useEffect, useState } from "react";

import type { WorkflowEventMessage } from "@/types/sales";

import { useWebSocket } from "./useWebSocket";

const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL ?? "ws://127.0.0.1:8000";

// Subscribes to a conversation's WorkflowEvent stream (events/routing.py:
// ws/conversations/{id}/). Used by the observability pages (Workflow
// Brain, Inspector, Trace) once they render live data.
export function useConversationEvents(conversationId: number | null) {
  const [events, setEvents] = useState<WorkflowEventMessage[]>([]);

  useEffect(() => {
    setEvents([]);
  }, [conversationId]);

  const url = conversationId !== null ? `${WS_BASE_URL}/ws/conversations/${conversationId}/` : null;

  useWebSocket(url, (data) => {
    setEvents((previous) => [...previous, data as WorkflowEventMessage]);
  });

  return { events };
}
