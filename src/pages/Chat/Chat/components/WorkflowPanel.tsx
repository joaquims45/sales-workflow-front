import { ConnectionStatus } from "@/components/ConnectionStatus";
import { WorkflowGraph } from "@/components/WorkflowGraph";
import { useConversationEvents } from "@/hooks/api";

import { styles } from "../styles";

export function WorkflowPanel({ conversationId }: { conversationId: number | null }) {
  const { events, status } = useConversationEvents(conversationId);

  return (
    <div style={styles.workflowPanel}>
      <div style={styles.workflowPanelHeader}>
        <h2 style={styles.workflowPanelTitle}>Workflow</h2>
        <ConnectionStatus status={status} />
      </div>

      {events.length === 0 ? (
        <p style={styles.workflowPanelEmpty}>No hay actividad todavía.</p>
      ) : (
        <div style={styles.workflowPanelGraph}>
          <WorkflowGraph events={events} />
        </div>
      )}
    </div>
  );
}
