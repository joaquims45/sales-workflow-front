import { StatusBadge } from "@/components/StatusBadge";

import type { NodeState } from "./deriveNodeStates";
import { styles } from "./styles";

const STATUS_STYLE_KEY: Record<NodeState["status"], keyof typeof styles> = {
  pending: "nodePending",
  running: "nodeRunning",
  completed: "nodeCompleted",
  failed: "nodeFailed",
  skipped: "nodeSkipped",
};

export function WorkflowNode({
  state,
  onClick,
}: {
  state: NodeState;
  onClick?: (node: string) => void;
}) {
  return (
    <button
      type="button"
      style={{ ...styles.node, ...styles[STATUS_STYLE_KEY[state.status]] }}
      onClick={onClick ? () => onClick(state.name) : undefined}
      disabled={!onClick}
    >
      <span style={styles.nodeName}>{state.name}</span>
      <span style={styles.nodeMeta}>
        <StatusBadge status={state.status} />
        {state.durationMs !== null && <span style={styles.nodeDuration}>{Math.round(state.durationMs)}ms</span>}
      </span>
      {state.error && <span style={styles.nodeError}>{state.error}</span>}
    </button>
  );
}
