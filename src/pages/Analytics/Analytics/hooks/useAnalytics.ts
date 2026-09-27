import { useEffect, useState } from "react";

import { getStoredConversationId, getTrace } from "@/services/conversationsService";
import type { WorkflowEvent } from "@/types/sales";

export interface RoutingDecisionCount {
  decision: string;
  count: number;
}

export interface AnalyticsSummary {
  totalEvents: number;
  eventCounts: { eventType: string; count: number }[];
  routingDecisions: RoutingDecisionCount[];
  averageJevConfidence: number | null;
  averageJevLatencyMs: number | null;
  averageTurnLatencyMs: number | null;
  escalationCount: number;
}

// There is no aggregate analytics endpoint yet (ARCHITECTURE.md §22 says
// not to build it all upfront) — this computes a minimal summary
// client-side from a single conversation's trace, just to have something
// real to look at rather than a hardcoded example.
function summarize(events: WorkflowEvent[]): AnalyticsSummary {
  const eventCountsMap = new Map<string, number>();
  const routingDecisionsMap = new Map<string, number>();
  const jevConfidences: number[] = [];
  const jevLatencies: number[] = [];
  const turnLatencies: number[] = [];
  let escalationCount = 0;

  for (const event of events) {
    eventCountsMap.set(event.event_type, (eventCountsMap.get(event.event_type) ?? 0) + 1);

    if (event.event_type === "routing.completed" && typeof event.payload.decision === "string") {
      const decision = event.payload.decision;
      routingDecisionsMap.set(decision, (routingDecisionsMap.get(decision) ?? 0) + 1);
    }

    if (event.event_type === "jev.decision") {
      if (typeof event.payload.confidence === "number") jevConfidences.push(event.payload.confidence);
      if (typeof event.payload.latency_ms === "number") jevLatencies.push(event.payload.latency_ms);
      if (typeof event.payload.confidence === "number" && event.payload.confidence < 0.85) {
        escalationCount += 1;
      }
    }

    if (event.event_type === "message.processed" && typeof event.payload.latency_ms === "number") {
      turnLatencies.push(event.payload.latency_ms);
    }
  }

  const average = (values: number[]) =>
    values.length === 0 ? null : values.reduce((sum, value) => sum + value, 0) / values.length;

  return {
    totalEvents: events.length,
    eventCounts: [...eventCountsMap.entries()]
      .map(([eventType, count]) => ({ eventType, count }))
      .sort((a, b) => b.count - a.count),
    routingDecisions: [...routingDecisionsMap.entries()].map(([decision, count]) => ({ decision, count })),
    averageJevConfidence: average(jevConfidences),
    averageJevLatencyMs: average(jevLatencies),
    averageTurnLatencyMs: average(turnLatencies),
    escalationCount,
  };
}

interface UseAnalyticsResult {
  conversationId: number | null;
  summary: AnalyticsSummary | null;
  error: string | null;
}

export function useAnalytics(): UseAnalyticsResult {
  const [conversationId] = useState(() => getStoredConversationId());
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (conversationId === null) return;

    getTrace(conversationId)
      .then((events) => setSummary(summarize(events)))
      .catch(() => setError("No pudimos cargar las métricas."));
  }, [conversationId]);

  return { conversationId, summary, error };
}
