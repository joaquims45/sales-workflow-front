import { useState, type ReactNode } from "react";

import { styles } from "./styles";

export function CollapsibleSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div style={styles.root}>
      <button type="button" style={styles.header} onClick={() => setOpen((value) => !value)}>
        <span>{title}</span>
        <span style={styles.chevron}>{open ? "▾" : "▸"}</span>
      </button>
      {open && <div style={styles.body}>{children}</div>}
    </div>
  );
}
