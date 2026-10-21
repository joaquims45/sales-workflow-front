import type { SideQueryState } from "./deriveSideQuery";
import { SideQueryNode } from "./SideQueryNode";
import { styles } from "./styles";

// Hangs a side query (e.g. SHIPPING_QUERY) off the node it interrupted —
// expanded and live while it's still running, collapsed to a small muted
// mark once workflow.resumed shows it's resolved (ARCHITECTURE redesign
// plan §8: "once resolved, collapses ... doesn't take up space in the main
// graph").
export function WorkflowBranch({ sideQuery }: { sideQuery: SideQueryState }) {
  return (
    <div style={{ ...styles.branch, ...(sideQuery.resolved ? styles.branchResolved : {}) }}>
      <div style={styles.branchConnector} />
      <SideQueryNode sideQuery={sideQuery} />
    </div>
  );
}
