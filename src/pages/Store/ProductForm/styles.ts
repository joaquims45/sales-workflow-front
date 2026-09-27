import type { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  container: { padding: "1.5rem", maxWidth: "480px" },
  backLink: { display: "inline-block", marginBottom: "1rem" },
  field: { display: "flex", flexDirection: "column", gap: "0.3rem", marginBottom: "1rem" },
  label: { fontSize: "0.85rem", opacity: 0.8 },
  input: {
    padding: "0.5rem 0.75rem",
    borderRadius: "8px",
    border: "1px solid #444",
    background: "transparent",
    color: "inherit",
  },
  textarea: {
    padding: "0.5rem 0.75rem",
    borderRadius: "8px",
    border: "1px solid #444",
    background: "transparent",
    color: "inherit",
    minHeight: "80px",
    fontFamily: "inherit",
  },
  row: { display: "flex", gap: "1rem" },
  rowField: { flex: 1 },
  success: { marginTop: "1rem", border: "1px solid #4caf50", borderRadius: "8px", padding: "1rem" },
};
