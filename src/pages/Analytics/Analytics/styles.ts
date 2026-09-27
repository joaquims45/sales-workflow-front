import type { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  container: { padding: "1.5rem", maxWidth: "640px" },
  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "1rem",
    marginTop: "1rem",
  },
  statCard: { border: "1px solid #444", borderRadius: "8px", padding: "1rem" },
  statLabel: { margin: "0 0 0.35rem", opacity: 0.7, fontSize: "0.8rem", textTransform: "uppercase" },
  statValue: { margin: 0, fontSize: "1.4rem", fontWeight: 600 },
  section: { marginTop: "2rem" },
  barRow: { display: "flex", alignItems: "center", gap: "0.75rem", margin: "0.4rem 0" },
  barLabel: { width: "110px", fontSize: "0.85rem" },
  barTrack: { flex: 1, background: "#2a2a2a", borderRadius: "4px", height: "10px", overflow: "hidden" },
  barFill: { background: "#aa3bff", height: "100%" },
  barCount: { width: "30px", textAlign: "right", fontSize: "0.85rem", opacity: 0.7 },
};
