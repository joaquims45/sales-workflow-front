import { useState, type ReactNode } from "react";

import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";

import { styles } from "./styles";

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={styles.root}>
      <Sidebar collapsed={collapsed} onToggleCollapsed={() => setCollapsed((value) => !value)} />
      <div style={styles.body}>
        <Topbar />
        <main style={styles.main}>{children}</main>
      </div>
    </div>
  );
}
