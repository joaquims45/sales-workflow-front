import { WorkflowGraph } from "@/components/WorkflowGraph";

import { useWorkflowGraphView } from "./hooks/useWorkflowGraphView";
import { styles } from "./styles";

export default function WorkflowInspector() {
  const { conversationId, isShippingActive, events } = useWorkflowGraphView();

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

      <WorkflowGraph events={events} />

      <div style={styles.sideQuery}>
        <p style={styles.sideQueryLabel}>SIDE_QUERY (interrupción)</p>
        <span style={isShippingActive ? styles.sideQueryBoxActive : styles.sideQueryBox}>
          SHIPPING_QUERY {isShippingActive ? "— SUSPENDED" : ""}
        </span>
      </div>

      <p style={styles.legend}>
        Cada nodo refleja su estado real (<code>node.started</code>/<code>node.completed</code>/
        <code>node.failed</code>) para el turno en curso. El recuadro de SHIPPING_QUERY se enciende solo
        durante el instante en que el workflow está suspendido — es momentáneo, ya que SIDE_QUERY se resuelve
        dentro del mismo turno.
      </p>
    </div>
  );
}
