import type { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  root: {
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-md)",
    background: "var(--bg-surface)",
    padding: "var(--space-3)",
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: "var(--space-2)",
  },
  nodeName: {
    fontFamily: "var(--font-mono)",
    fontSize: "var(--text-sm)",
    fontWeight: 600,
    color: "var(--text-primary)",
    marginBottom: "var(--space-1)",
  },
  closeButton: {
    background: "transparent",
    border: "none",
    color: "var(--text-muted)",
    fontSize: "var(--text-lg)",
    lineHeight: 1,
    cursor: "pointer",
    padding: "0 var(--space-1)",
  },
  fieldList: {
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-1)",
  },
  field: {
    display: "flex",
    justifyContent: "space-between",
    gap: "var(--space-3)",
  },
  fieldLabel: {
    margin: 0,
    fontSize: "var(--text-xs)",
    color: "var(--text-muted)",
  },
  fieldValue: {
    margin: 0,
    fontSize: "var(--text-xs)",
    color: "var(--text-secondary)",
    fontFamily: "var(--font-mono)",
    textAlign: "right",
  },
  message: {
    margin: 0,
    fontSize: "var(--text-sm)",
    color: "var(--text-secondary)",
    whiteSpace: "pre-wrap",
  },
  empty: {
    margin: 0,
    fontSize: "var(--text-xs)",
    color: "var(--text-muted)",
    fontStyle: "italic",
  },
  error: {
    margin: 0,
    fontSize: "var(--text-sm)",
    color: "var(--status-failed)",
  },
};
