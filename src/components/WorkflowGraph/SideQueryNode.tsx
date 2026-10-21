import { StatusBadge } from "@/components/StatusBadge";

import type { SideQueryState } from "./deriveSideQuery";
import { styles } from "./styles";

export function SideQueryNode({
  sideQuery,
  onClick,
}: {
  sideQuery: SideQueryState;
  onClick?: (node: string) => void;
}) {
  return (
    <button
      type="button"
      style={{ ...styles.sideQueryNode, ...(sideQuery.resolved ? styles.sideQueryNodeResolved : {}) }}
      onClick={onClick ? () => onClick(sideQuery.workflowName) : undefined}
      disabled={!onClick}
    >
      <span style={styles.sideQueryNodeName}>{sideQuery.workflowName}</span>
      <span style={styles.nodeMeta}>
        <StatusBadge status={sideQuery.status} />
        {sideQuery.durationMs !== null && (
          <span style={styles.nodeDuration}>{Math.round(sideQuery.durationMs)}ms</span>
        )}
      </span>
    </button>
  );
}
