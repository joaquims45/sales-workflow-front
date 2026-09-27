import type { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  root: {
    display: "flex",
    height: "100vh",
    background: "var(--bg-canvas)",
  },
  body: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    minHeight: 0,
  },
  main: {
    flex: 1,
    minHeight: 0,
    padding: "var(--space-5)",
    overflowY: "auto",
  },
};
