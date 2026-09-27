import type { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "var(--space-3) var(--space-5)",
    borderBottom: "1px solid var(--border)",
    background: "var(--bg-canvas)",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  title: {
    fontSize: "var(--text-lg)",
    fontWeight: 600,
    margin: 0,
  },
};
