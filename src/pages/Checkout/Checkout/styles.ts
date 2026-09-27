import type { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  container: { padding: "1.5rem", maxWidth: "480px" },
  card: {
    border: "1px solid #444",
    borderRadius: "8px",
    padding: "1.25rem",
    marginTop: "1rem",
  },
  row: { display: "flex", justifyContent: "space-between", margin: "0.35rem 0" },
  label: { opacity: 0.7 },
  badgePending: { color: "#ffb020", fontWeight: 600 },
  badgeApproved: { color: "#4caf50", fontWeight: 600 },
  badgeRejected: { color: "#f44336", fontWeight: 600 },
  badgeCancelled: { color: "#888", fontWeight: 600 },
  actions: { display: "flex", gap: "0.75rem", marginTop: "1.25rem" },
  note: { marginTop: "1rem", fontSize: "0.85rem", opacity: 0.7 },
};
