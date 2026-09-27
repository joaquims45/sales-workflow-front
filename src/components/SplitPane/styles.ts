import type { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  group: {
    height: "100%",
    width: "100%",
  },
  pane: {
    height: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  handle: {
    width: 1,
    background: "var(--border)",
    position: "relative",
    cursor: "col-resize",
  },
};
