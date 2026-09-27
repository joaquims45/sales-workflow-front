import type { Status } from "@/components/StatusBadge";
import type { WorkflowEventMessage } from "@/types/sales";

export interface NodeState {
  name: string;
  status: Status;
  durationMs: number | null;
  error: string | null;
}

/**
 * Derives each node's status from real node.started/completed/failed
 * events (workflows/graph/instrumentation.py) — never fabricates a
 * "skipped" state, since the backend doesn't emit anything that would
 * let us tell "skipped" apart from "not reached yet" honestly.
 *
 * Only considers events since the last message.received, so the graph
 * reflects the turn currently in progress (or just finished) rather than
 * every node ever touched across the whole conversation.
 */
export function deriveNodeStates(events: WorkflowEventMessage[], nodeOrder: readonly string[]): NodeState[] {
  const states = new Map<string, NodeState>(
    nodeOrder.map((name) => [name, { name, status: "pending", durationMs: null, error: null }]),
  );

  const lastMessageIndex = events.map((event) => event.event_type).lastIndexOf("message.received");
  const turnEvents = lastMessageIndex === -1 ? events : events.slice(lastMessageIndex);

  for (const event of turnEvents) {
    const node = event.payload.node;
    if (typeof node !== "string" || !states.has(node)) continue;

    if (event.event_type === "node.started") {
      states.set(node, { name: node, status: "running", durationMs: null, error: null });
    } else if (event.event_type === "node.completed") {
      const durationMs = typeof event.payload.duration_ms === "number" ? event.payload.duration_ms : null;
      states.set(node, { name: node, status: "completed", durationMs, error: null });
    } else if (event.event_type === "node.failed") {
      const durationMs = typeof event.payload.duration_ms === "number" ? event.payload.duration_ms : null;
      const error = typeof event.payload.error === "string" ? event.payload.error : null;
      states.set(node, { name: node, status: "failed", durationMs, error });
    }
  }

  return nodeOrder.map((name) => states.get(name)!);
}
