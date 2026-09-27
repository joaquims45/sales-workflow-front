import type { LucideIcon } from "lucide-react";
import { BarChart3, CreditCard, ListTree, MessageSquare, SearchCode, Store, Workflow } from "lucide-react";

export type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Commerce",
    items: [
      { to: "/store", label: "Store", icon: Store },
      { to: "/checkout", label: "Checkout", icon: CreditCard },
    ],
  },
  {
    label: "Agent",
    items: [{ to: "/chat", label: "Chat", icon: MessageSquare }],
  },
  {
    label: "Observability",
    items: [
      { to: "/observability", label: "Workflow Brain", icon: Workflow, end: true },
      { to: "/observability/inspector", label: "Inspector", icon: SearchCode },
      { to: "/observability/trace", label: "Trace", icon: ListTree },
      { to: "/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
];
