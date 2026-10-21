import type { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  container: { maxWidth: "480px" },
  subtitle: { color: "var(--text-secondary)", fontSize: "var(--text-sm)", marginBottom: "var(--space-5)" },
  inspector: { marginTop: "var(--space-4)" },
  legend: { marginTop: "var(--space-6)", fontSize: "var(--text-sm)", color: "var(--text-muted)" },
};
