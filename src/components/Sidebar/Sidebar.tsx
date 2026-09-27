import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { NavLink } from "react-router-dom";

import { NAV_GROUPS } from "./navConfig";
import { styles } from "./styles";

export function Sidebar({
  collapsed,
  onToggleCollapsed,
}: {
  collapsed: boolean;
  onToggleCollapsed: () => void;
}) {
  return (
    <aside style={{ ...styles.root, ...(collapsed ? styles.rootCollapsed : {}) }}>
      <div style={styles.brand}>
        <span style={styles.brandMark}>SA</span>
        {!collapsed && <span style={styles.brandText}>Sales Agent Studio</span>}
      </div>

      <nav style={styles.nav}>
        {NAV_GROUPS.map((group) => (
          <div key={group.label} style={styles.group}>
            {!collapsed && <div style={styles.groupLabel}>{group.label}</div>}
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  title={collapsed ? item.label : undefined}
                  style={({ isActive }) => ({
                    ...styles.link,
                    ...(isActive ? styles.linkActive : {}),
                    ...(collapsed ? styles.linkCollapsed : {}),
                  })}
                >
                  <Icon size={17} strokeWidth={1.75} style={styles.linkIcon} />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      <button type="button" style={styles.collapseButton} onClick={onToggleCollapsed}>
        {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        {!collapsed && <span>Collapse</span>}
      </button>
    </aside>
  );
}
