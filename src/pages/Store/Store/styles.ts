import type { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  container: { padding: "1.5rem" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "1rem",
    marginTop: "1rem",
  },
  card: {
    display: "block",
    padding: "1rem",
    border: "1px solid #444",
    borderRadius: "8px",
    textDecoration: "none",
    color: "inherit",
  },
  cardTitle: { margin: "0 0 0.5rem", fontSize: "1rem" },
  cardCategory: { margin: "0 0 0.5rem", opacity: 0.7, fontSize: "0.85rem" },
  cardPrice: { margin: 0, fontWeight: 600 },
};
