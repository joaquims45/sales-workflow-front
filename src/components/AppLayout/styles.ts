import type { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  shell: { display: "flex", flexDirection: "column", minHeight: "100vh" },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    padding: "0.75rem 1.5rem",
    borderBottom: "1px solid #444",
    flexWrap: "wrap",
  },
  brand: { fontWeight: 700, marginRight: "0.5rem" },
  links: { display: "flex", gap: "1rem", flexWrap: "wrap" },
  link: { textDecoration: "none", color: "inherit", opacity: 0.7, fontSize: "0.9rem", paddingBottom: "0.15rem" },
  linkActive: { opacity: 1, fontWeight: 600, borderBottom: "2px solid #aa3bff" },
  main: { flex: 1 },
};
