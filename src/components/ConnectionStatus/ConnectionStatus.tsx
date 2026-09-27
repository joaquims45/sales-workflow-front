import type { CSSProperties } from "react";

import type { ConnectionState } from "@/hooks/api";

import { styles } from "./styles";

export type { ConnectionState };

const LABELS: Record<ConnectionState, string> = {
  connecting: "Connecting…",
  open: "Live",
  closed: "Disconnected",
  error: "Connection error",
};

const DOT_STYLES: Record<ConnectionState, CSSProperties> = {
  connecting: styles.dotConnecting,
  open: styles.dotOpen,
  closed: styles.dotClosed,
  error: styles.dotError,
};

export function ConnectionStatus({ status = "connecting" }: { status?: ConnectionState }) {
  return (
    <div style={styles.root}>
      <span style={{ ...styles.dot, ...DOT_STYLES[status] }} />
      <span style={styles.label}>{LABELS[status]}</span>
    </div>
  );
}
