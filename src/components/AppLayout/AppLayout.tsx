import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import { styles } from "./styles";

const NAV_LINKS: { to: string; label: string; end?: boolean }[] = [
  { to: "/store", label: "Store" },
  { to: "/chat", label: "Chat" },
  { to: "/checkout", label: "Checkout" },
  { to: "/observability", label: "Workflow Brain", end: true },
  { to: "/observability/inspector", label: "Inspector" },
  { to: "/observability/trace", label: "Trace" },
  { to: "/analytics", label: "Analytics" },
];

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div style={styles.shell}>
      <nav style={styles.nav}>
        <span style={styles.brand}>Sales Workflow</span>
        <div style={styles.links}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              style={({ isActive }) => (isActive ? { ...styles.link, ...styles.linkActive } : styles.link)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
      <main style={styles.main}>{children}</main>
    </div>
  );
}
