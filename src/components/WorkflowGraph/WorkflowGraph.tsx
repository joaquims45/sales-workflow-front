import type { WorkflowEventMessage } from "@/types/sales";

import { deriveNodeStates } from "./deriveNodeStates";
import { styles } from "./styles";
import { WorkflowNode } from "./WorkflowNode";

// Mirrors workflows/graph/product_purchase.py's node names and rough
// execution order exactly. A simplified single spine, not a full graph
// layout — the conditional edges (ASK_FOR_BUDGET vs PRODUCT_SEARCH,
// SELECT_PRODUCT vs ASK_WHICH_PRODUCT) aren't drawn as branches; only
// the SIDE_QUERY interruption gets that treatment (Stage 7).
export const PRODUCT_PURCHASE_NODE_ORDER = [
  "DISCOVERY",
  "ASK_FOR_BUDGET",
  "PRODUCT_SEARCH",
  "RECOMMENDATION",
  "SELECT_PRODUCT",
  "ASK_WHICH_PRODUCT",
  "CHECKOUT",
] as const;

export function WorkflowGraph({
  events,
  onSelectNode,
}: {
  events: WorkflowEventMessage[];
  onSelectNode?: (node: string) => void;
}) {
  const nodeStates = deriveNodeStates(events, PRODUCT_PURCHASE_NODE_ORDER);

  return (
    <div style={styles.graph}>
      {nodeStates.map((state, index) => (
        <div key={state.name} style={styles.graphRow}>
          <WorkflowNode state={state} onClick={onSelectNode} />
          {index < nodeStates.length - 1 && <div style={styles.edge} />}
        </div>
      ))}
    </div>
  );
}
