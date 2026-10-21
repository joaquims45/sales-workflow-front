import { useState } from "react";

import { NodeInspector } from "@/components/NodeInspector";
import { WorkflowGraph } from "@/components/WorkflowGraph";

import { useWorkflowGraphView } from "./hooks/useWorkflowGraphView";
import { styles } from "./styles";

export default function WorkflowInspector() {
  const { conversationId, events } = useWorkflowGraphView();
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  if (conversationId === null) {
    return (
      <div style={styles.container}>
        <h1>Workflow Inspector</h1>
        <p>Todavía no hay una conversación activa. Andá al Chat para iniciar una.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>Workflow Inspector</h1>
      <p style={styles.subtitle}>PRODUCT_PURCHASE — conversación #{conversationId}</p>

      <WorkflowGraph events={events} onSelectNode={setSelectedNode} />

      {selectedNode && (
        <div style={styles.inspector}>
          <NodeInspector nodeName={selectedNode} events={events} onClose={() => setSelectedNode(null)} />
        </div>
      )}

      <p style={styles.legend}>
        Cada nodo refleja su estado real (<code>node.started</code>/<code>node.completed</code>/
        <code>node.failed</code>) para el turno en curso — click en un nodo para ver su detalle. Una
        consulta lateral como SHIPPING_QUERY aparece como una rama temporal colgando del nodo que
        interrumpió.
      </p>
    </div>
  );
}
