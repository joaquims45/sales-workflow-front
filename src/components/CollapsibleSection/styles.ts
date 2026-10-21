import type { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  root: {
    borderTop: "1px solid var(--border-subtle)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "var(--space-2) 0",
    background: "transparent",
    border: "none",
    color: "var(--text-primary)",
    fontSize: "var(--text-sm)",
    fontWeight: 600,
    fontFamily: "inherit",
    cursor: "pointer",
    textAlign: "left",
  },
  chevron: {
    color: "var(--text-muted)",
    fontSize: "var(--text-xs)",
  },
  body: {
    paddingBottom: "var(--space-3)",
  },
};
