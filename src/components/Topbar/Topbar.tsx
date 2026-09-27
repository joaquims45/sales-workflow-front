import { useLocation } from "react-router-dom";

import { ConnectionStatus } from "@/components/ConnectionStatus";

import { NAV_GROUPS } from "../Sidebar/navConfig";
import { styles } from "./styles";

function currentPageTitle(pathname: string): string {
  const allItems = NAV_GROUPS.flatMap((group) => group.items);
  // Longest matching "to" wins, so /observability/trace doesn't match
  // "Workflow Brain" (/observability) first.
  const match = [...allItems]
    .sort((a, b) => b.to.length - a.to.length)
    .find((item) => pathname === item.to || pathname.startsWith(`${item.to}/`));
  return match?.label ?? "Sales Agent Studio";
}

export function Topbar() {
  const location = useLocation();

  return (
    <header style={styles.root}>
      <h1 style={styles.title}>{currentPageTitle(location.pathname)}</h1>
      <ConnectionStatus />
    </header>
  );
}
