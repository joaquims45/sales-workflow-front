import { useEffect, useState } from "react";

import { ConnectionStatus } from "@/components/ConnectionStatus";
import { NodeInspector } from "@/components/NodeInspector";
import { WorkflowGraph } from "@/components/WorkflowGraph";
import { useConversationEvents } from "@/hooks/api";

import { styles } from "../styles";

export function WorkflowPanel({ conversationId }: { conversationId: number | null }) {
  const { events, status } = useConversationEvents(conversationId);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  useEffect(() => {
    setSelectedNode(null);
  }, [conversationId]);

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
          <WorkflowGraph events={events} onSelectNode={setSelectedNode} />
          {selectedNode && (
            <div style={styles.workflowPanelInspector}>
              <NodeInspector nodeName={selectedNode} events={events} onClose={() => setSelectedNode(null)} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
