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
};
