import type { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  graph: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  graphRow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  edge: {
    width: 1,
    height: "var(--space-4)",
    background: "var(--border)",
    marginLeft: "calc(var(--space-3) + 4px)",
  },

  node: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "var(--space-1)",
    width: "100%",
    textAlign: "left",
    padding: "var(--space-2) var(--space-3)",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--border)",
    background: "var(--bg-surface)",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  nodeName: {
    fontSize: "var(--text-sm)",
    fontWeight: 600,
    color: "var(--text-primary)",
    fontFamily: "var(--font-mono)",
  },
  nodeMeta: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-2)",
  },
  nodeDuration: {
    fontSize: "var(--text-xs)",
    color: "var(--text-muted)",
    fontFamily: "var(--font-mono)",
  },
  nodeError: {
    fontSize: "var(--text-xs)",
    color: "var(--status-failed)",
  },

  nodePending: {
    opacity: 0.55,
  },
  nodeRunning: {
    borderColor: "var(--status-running)",
    background: "var(--status-running-bg)",
  },
  nodeCompleted: {
    borderColor: "var(--border)",
    background: "var(--bg-surface)",
  },
  nodeFailed: {
    borderColor: "var(--status-failed)",
    background: "var(--status-failed-bg)",
  },
  nodeSkipped: {
    opacity: 0.4,
  },

  branch: {
    display: "flex",
    alignItems: "stretch",
    gap: "var(--space-2)",
    marginLeft: "var(--space-5)",
    marginTop: "var(--space-1)",
    marginBottom: "var(--space-2)",
  },
  branchResolved: {
    opacity: 0.6,
  },
  branchConnector: {
    width: "var(--space-3)",
    borderLeft: "1px dashed var(--border-strong)",
    borderBottom: "1px dashed var(--border-strong)",
    borderBottomLeftRadius: "var(--radius-sm)",
    marginTop: "-6px",
    height: "1.4rem",
    flexShrink: 0,
  },

  sideQueryNode: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "var(--space-1)",
    padding: "var(--space-1) var(--space-2)",
    borderRadius: "var(--radius-sm)",
    border: "1px dashed var(--status-running)",
    background: "var(--status-running-bg)",
    flex: 1,
    textAlign: "left",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  sideQueryNodeResolved: {
    border: "1px dashed var(--border)",
    background: "var(--bg-surface)",
  },
  sideQueryNodeName: {
    fontSize: "var(--text-xs)",
    fontWeight: 600,
    color: "var(--text-secondary)",
    fontFamily: "var(--font-mono)",
  },
};
