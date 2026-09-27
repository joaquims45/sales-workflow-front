import type { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  container: { maxWidth: "480px" },
  subtitle: { color: "var(--text-secondary)", fontSize: "var(--text-sm)", marginBottom: "var(--space-5)" },
  sideQuery: { marginTop: "var(--space-5)" },
  sideQueryLabel: { fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginBottom: "var(--space-2)" },
  sideQueryBox: {
    border: "1px dashed var(--border-strong)",
    borderRadius: "var(--radius-md)",
    padding: "var(--space-2) var(--space-3)",
    fontSize: "var(--text-sm)",
    display: "inline-block",
    color: "var(--text-muted)",
  },
  sideQueryBoxActive: {
    border: "2px solid var(--status-warning)",
    borderRadius: "var(--radius-md)",
    padding: "calc(var(--space-2) - 1px) calc(var(--space-3) - 1px)",
    fontSize: "var(--text-sm)",
    display: "inline-block",
    background: "var(--status-warning-bg)",
    fontWeight: 600,
    color: "var(--text-primary)",
  },
  legend: { marginTop: "var(--space-6)", fontSize: "var(--text-sm)", color: "var(--text-muted)" },
};
