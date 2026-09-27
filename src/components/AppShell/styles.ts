import type { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  root: {
    display: "flex",
    minHeight: "100vh",
    background: "var(--bg-canvas)",
  },
  body: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  main: {
    flex: 1,
    padding: "var(--space-5)",
    minWidth: 0,
  },
};
