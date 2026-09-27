import type { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  container: { padding: "1.5rem" },
  backLink: { display: "inline-block", marginBottom: "1rem" },
  category: { opacity: 0.7, fontSize: "0.9rem" },
  price: { fontSize: "1.5rem", fontWeight: 600, margin: "0.5rem 0" },
  stock: { fontSize: "0.9rem" },
  featureList: { display: "flex", flexWrap: "wrap", gap: "0.5rem", listStyle: "none", padding: 0 },
  featureTag: {
    border: "1px solid #444",
    borderRadius: "999px",
    padding: "0.15rem 0.6rem",
    fontSize: "0.85rem",
  },
};
