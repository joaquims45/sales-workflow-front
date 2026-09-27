import type { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  root: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-2)",
    fontSize: "var(--text-xs)",
    color: "var(--text-secondary)",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    flexShrink: 0,
  },
  dotConnecting: { background: "var(--status-warning)" },
  dotOpen: { background: "var(--status-completed)" },
  dotClosed: { background: "var(--text-muted)" },
  dotError: { background: "var(--status-failed)" },
  label: { whiteSpace: "nowrap" },
};
