import { ConnectionStatus } from "@/components/ConnectionStatus";
import { useConversationEvents } from "@/hooks/api";
import type { WorkflowEventMessage } from "@/types/sales";

import { styles } from "../styles";

function summarize(event: WorkflowEventMessage): string {
  const payload = event.payload;

  switch (event.event_type) {
    case "node.started":
      return `${payload.node} started`;
    case "node.completed":
      return `${payload.node} completed (${Math.round(Number(payload.duration_ms))}ms)`;
    case "node.failed":
      return `${payload.node} failed: ${payload.error}`;
    case "jev.decision":
    case "routing.completed":
      return `routing → ${payload.decision} (${Math.round(Number(payload.confidence) * 100)}%)`;
    case "workflow.suspended":
      return `suspended: ${payload.workflow ?? ""}`;
    case "workflow.resumed":
      return `resumed: ${payload.workflow ?? ""}`;
    default:
      return event.event_type;
  }
}

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

/**
 * Interim event feed — Stage 6 replaces this body with the vertical
 * WorkflowGraph (WorkflowNode/WorkflowBranch). The live wiring
 * (useConversationEvents, real ConnectionStatus) built here stays as-is.
 */
export function WorkflowPanel({ conversationId }: { conversationId: number | null }) {
  const { events, status } = useConversationEvents(conversationId);

  return (
    <div style={styles.workflowPanel}>
      <div style={styles.workflowPanelHeader}>
        <h2 style={styles.workflowPanelTitle}>Workflow</h2>
        <ConnectionStatus status={status} />
      </div>

      {events.length === 0 && <p style={styles.workflowPanelEmpty}>No hay actividad todavía.</p>}

      <div style={styles.workflowPanelList}>
        {events.map((event, index) => (
          <div key={index} style={styles.workflowPanelEvent}>
            <span style={styles.workflowPanelEventTime}>{formatTime(event.created_at)}</span>
            <span style={styles.workflowPanelEventLabel}>{summarize(event)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
