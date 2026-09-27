import { useEffect, useState } from "react";

import { useConversationEvents } from "@/hooks/api";
import { getStoredConversationId, getTrace } from "@/services/conversationsService";
import type { WorkflowEvent, WorkflowEventMessage } from "@/types/sales";

export interface TraceRow {
  key: string;
  event_type: string;
  payload: Record<string, unknown>;
  created_at: string;
}

function toRow(event: WorkflowEvent | WorkflowEventMessage, fallbackKey: string): TraceRow {
  return {
    key: "id" in event ? `rest-${event.id}` : fallbackKey,
    event_type: event.event_type,
    payload: event.payload,
    created_at: event.created_at,
  };
}

interface UseTraceResult {
  conversationId: number | null;
  rows: TraceRow[];
  error: string | null;
}

export function useTrace(): UseTraceResult {
  const [conversationId] = useState(() => getStoredConversationId());
  const [historyRows, setHistoryRows] = useState<TraceRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { events: liveEvents } = useConversationEvents(conversationId);

  useEffect(() => {
    if (conversationId === null) return;

    getTrace(conversationId)
      .then((events) => setHistoryRows(events.map((event) => toRow(event, `history-${event.id}`))))
      .catch(() => setError("No pudimos cargar el trace."));
  }, [conversationId]);

  // Loaded once on mount; new turns after that arrive live over the socket
  // instead of via polling, so no dedup against historyRows is needed here.
  const liveRows = liveEvents.map((event, index) => toRow(event, `live-${index}`));

  return { conversationId, rows: [...historyRows, ...liveRows], error };
}
