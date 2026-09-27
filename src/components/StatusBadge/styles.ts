import type { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  root: {
    display: "inline-flex",
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
  dotPending: { background: "var(--status-pending)" },
  dotRunning: { background: "var(--status-running)" },
  dotCompleted: { background: "var(--status-completed)" },
  dotFailed: { background: "var(--status-failed)" },
  dotSkipped: { background: "var(--status-skipped)" },
};
