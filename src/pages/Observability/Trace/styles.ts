import type { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  container: { padding: "1.5rem" },
  timeline: { marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.4rem" },
  row: {
    display: "grid",
    gridTemplateColumns: "90px 180px 1fr",
    gap: "0.75rem",
    alignItems: "baseline",
    borderBottom: "1px solid #333",
    padding: "0.35rem 0",
    fontSize: "0.85rem",
  },
  time: { opacity: 0.6, fontVariantNumeric: "tabular-nums" },
  eventType: { fontWeight: 600 },
  payload: { opacity: 0.8, fontFamily: "var(--mono, monospace)", wordBreak: "break-word" },
};
