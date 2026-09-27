import type { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  container: { padding: "1.5rem" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1rem",
    marginTop: "1rem",
  },
  section: {
    border: "1px solid #444",
    borderRadius: "8px",
    padding: "1rem",
  },
  label: { margin: "0 0 0.35rem", opacity: 0.7, fontSize: "0.8rem", textTransform: "uppercase" },
  value: { margin: 0, fontSize: "1rem" },
  tagList: { display: "flex", flexWrap: "wrap", gap: "0.35rem", listStyle: "none", padding: 0, margin: 0 },
  tag: { border: "1px solid #444", borderRadius: "999px", padding: "0.1rem 0.55rem", fontSize: "0.8rem" },
};
