import type { Status } from "@/components/StatusBadge";
import { turnEvents } from "@/components/WorkflowGraph";
import type { WorkflowEventMessage } from "@/types/sales";

export interface NodeDetail {
  name: string;
  status: Status;
  workflow: string | null;
  durationMs: number | null;
  error: string | null;
  startedAt: string | null;
  completedAt: string | null;
  triggeringMessage: string | null;
  routingDecision: string | null;
  routingConfidence: number | null;
}

/**
 * Everything we can honestly say about one node from the current turn's
 * real events — no fabricated input/output/model info the backend doesn't
 * actually emit (ARCHITECTURE.md §52). "triggeringMessage" is the user
 * message that started this turn, not a literal per-node input — it's the
 * most truthful answer to "why did this run" we have without the backend
 * logging per-node state snapshots.
 */
export function deriveNodeDetail(events: WorkflowEventMessage[], nodeName: string): NodeDetail {
  const turn = turnEvents(events);

  let status: Status = "pending";
  let workflow: string | null = null;
  let durationMs: number | null = null;
  let error: string | null = null;
  let startedAt: string | null = null;
  let completedAt: string | null = null;
  let triggeringMessage: string | null = null;
  let routingDecision: string | null = null;
  let routingConfidence: number | null = null;

  for (const event of turn) {
    if (event.event_type === "message.received" && typeof event.payload.content === "string") {
      triggeringMessage = event.payload.content;
    }
    if (event.event_type === "routing.completed") {
      routingDecision = typeof event.payload.decision === "string" ? event.payload.decision : null;
      routingConfidence = typeof event.payload.confidence === "number" ? event.payload.confidence : null;
    }

    if (event.payload.node !== nodeName) continue;

    if (event.event_type === "node.started") {
      status = "running";
      workflow = typeof event.payload.workflow === "string" ? event.payload.workflow : null;
      startedAt = event.created_at;
    } else if (event.event_type === "node.completed") {
      status = "completed";
      workflow = typeof event.payload.workflow === "string" ? event.payload.workflow : workflow;
      durationMs = typeof event.payload.duration_ms === "number" ? event.payload.duration_ms : null;
      completedAt = event.created_at;
    } else if (event.event_type === "node.failed") {
      status = "failed";
      workflow = typeof event.payload.workflow === "string" ? event.payload.workflow : workflow;
      durationMs = typeof event.payload.duration_ms === "number" ? event.payload.duration_ms : null;
      error = typeof event.payload.error === "string" ? event.payload.error : null;
      completedAt = event.created_at;
    }
  }

  return {
    name: nodeName,
    status,
    workflow,
    durationMs,
    error,
    startedAt,
    completedAt,
    triggeringMessage,
    routingDecision,
    routingConfidence,
  };
}
