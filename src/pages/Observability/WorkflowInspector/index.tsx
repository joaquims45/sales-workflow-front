import { useWorkflowGraphView } from "./hooks/useWorkflowGraphView";
import { styles } from "./styles";

// Mirrors workflows/graph/product_purchase.py's node names exactly, so
// highlighting stays correct without a separate "display name" mapping.
const MAIN_PATH = ["DISCOVERY", "PRODUCT_SEARCH", "RECOMMENDATION", "CHECKOUT"];

export default function WorkflowInspector() {
  const { conversationId, salesState, isShippingActive } = useWorkflowGraphView();

  if (conversationId === null) {
    return (
      <div style={styles.container}>
        <h1>Workflow Inspector</h1>
        <p>Todavía no hay una conversación activa. Andá al Chat para iniciar una.</p>
      </div>
    );
  }

  const activeNode = salesState?.active_node ?? null;

  return (
    <div style={styles.container}>
      <h1>Workflow Inspector</h1>
      <p>PRODUCT_PURCHASE — conversación #{conversationId}</p>

      <div style={styles.mainPath}>
        {MAIN_PATH.map((node, index) => (
          <div key={node} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={node === activeNode ? styles.nodeActive : styles.node}>{node}</span>
            {index < MAIN_PATH.length - 1 && <span style={styles.arrow}>→</span>}
          </div>
        ))}
      </div>

      <div style={styles.branchRow}>
        <span style={styles.branchNode}>si falta presupuesto → ASK_FOR_BUDGET</span>
        <span style={styles.branchNode}>si hay más de un candidato → ASK_WHICH_PRODUCT</span>
      </div>

      <div>
        <p style={{ marginTop: "1.5rem", marginBottom: 0 }}>SIDE_QUERY (interrupción)</p>
        <span style={isShippingActive ? styles.sideQueryBoxActive : styles.sideQueryBox}>
          SHIPPING_QUERY {isShippingActive ? "— SUSPENDED" : ""}
        </span>
      </div>

      <p style={styles.legend}>
        El nodo resaltado en violeta es el <code>active_node</code> actual del SalesState. El recuadro de
        SHIPPING_QUERY se enciende solo durante el instante en que el workflow está suspendido — es
        momentáneo, ya que SIDE_QUERY se resuelve dentro del mismo turno.
      </p>
    </div>
  );
}
