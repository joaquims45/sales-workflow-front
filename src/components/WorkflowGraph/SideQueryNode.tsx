import { StatusBadge } from "@/components/StatusBadge";

import type { SideQueryState } from "./deriveSideQuery";
import { styles } from "./styles";

export function SideQueryNode({ sideQuery }: { sideQuery: SideQueryState }) {
  return (
    <div style={{ ...styles.sideQueryNode, ...(sideQuery.resolved ? styles.sideQueryNodeResolved : {}) }}>
      <span style={styles.sideQueryNodeName}>{sideQuery.workflowName}</span>
      <span style={styles.nodeMeta}>
        <StatusBadge status={sideQuery.status} />
        {sideQuery.durationMs !== null && (
          <span style={styles.nodeDuration}>{Math.round(sideQuery.durationMs)}ms</span>
        )}
      </span>
    </div>
  );
}
