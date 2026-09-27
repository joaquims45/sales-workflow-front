import type { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  container: { padding: "1.5rem" },
  mainPath: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "1.5rem",
    flexWrap: "wrap",
  },
  arrow: { opacity: 0.5 },
  node: {
    border: "1px solid #444",
    borderRadius: "8px",
    padding: "0.6rem 1rem",
    fontSize: "0.9rem",
  },
  nodeActive: {
    border: "2px solid #aa3bff",
    borderRadius: "8px",
    padding: "0.55rem 0.95rem",
    fontSize: "0.9rem",
    background: "rgba(170, 59, 255, 0.15)",
    fontWeight: 600,
  },
  branchRow: {
    display: "flex",
    gap: "1rem",
    marginTop: "1.5rem",
    flexWrap: "wrap",
  },
  branchNode: {
    border: "1px dashed #666",
    borderRadius: "8px",
    padding: "0.5rem 0.9rem",
    fontSize: "0.8rem",
    opacity: 0.7,
  },
  sideQueryBox: {
    border: "1px dashed #666",
    borderRadius: "8px",
    padding: "0.5rem 0.9rem",
    fontSize: "0.85rem",
    marginTop: "0.5rem",
    display: "inline-block",
  },
  sideQueryBoxActive: {
    border: "2px solid #ffb020",
    borderRadius: "8px",
    padding: "0.45rem 0.85rem",
    fontSize: "0.85rem",
    marginTop: "0.5rem",
    display: "inline-block",
    background: "rgba(255, 176, 32, 0.15)",
    fontWeight: 600,
  },
  legend: { marginTop: "2rem", fontSize: "0.85rem", opacity: 0.7 },
};
