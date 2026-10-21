import type { Status } from "@/components/StatusBadge";
import type { WorkflowEventMessage } from "@/types/sales";

import { turnEvents } from "./turnEvents";

export interface SideQueryState {
  fromNode: string;
  workflowName: string;
  status: Status;
  durationMs: number | null;
  resolved: boolean;
}

/**
 * Derives the current turn's side query (e.g. SHIPPING_QUERY) as a
 * temporary branch off the PRODUCT_PURCHASE node it interrupted — from
 * workflow.suspended/resumed (apps/conversations/services.py) plus the
 * side query's own node.started/completed/failed events. Returns null
 * when no side query happened this turn.
 */
export function deriveSideQuery(events: WorkflowEventMessage[]): SideQueryState | null {
  const turn = turnEvents(events);

  const suspendedIndex = turn.findLastIndex((event) => event.event_type === "workflow.suspended");
  if (suspendedIndex === -1) return null;

  const fromNode = turn[suspendedIndex].payload.node;
  if (typeof fromNode !== "string") return null;

  const rest = turn.slice(suspendedIndex + 1);

  // workflow.suspended's own "workflow" field names what got interrupted
  // (e.g. PRODUCT_PURCHASE), not the side query — that's whatever node the
  // next node.* event names (e.g. SHIPPING_QUERY).
  const firstNodeEvent = rest.find(
    (event) =>
      typeof event.payload.node === "string" &&
      (event.event_type === "node.started" ||
        event.event_type === "node.completed" ||
        event.event_type === "node.failed"),
  );
  if (!firstNodeEvent) return null;

  const workflowName = firstNodeEvent.payload.node as string;

  let status: Status = "pending";
  let durationMs: number | null = null;

  for (const event of rest) {
    if (event.payload.node !== workflowName) continue;

    if (event.event_type === "node.started") {
      status = "running";
    } else if (event.event_type === "node.completed") {
      status = "completed";
      durationMs = typeof event.payload.duration_ms === "number" ? event.payload.duration_ms : null;
    } else if (event.event_type === "node.failed") {
      status = "failed";
      durationMs = typeof event.payload.duration_ms === "number" ? event.payload.duration_ms : null;
    }
  }

  const resolved = rest.some((event) => event.event_type === "workflow.resumed");

  return { fromNode, workflowName, status, durationMs, resolved };
}
