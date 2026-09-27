import { styles } from "./styles";

export type Status = "pending" | "running" | "completed" | "failed" | "skipped";

const LABELS: Record<Status, string> = {
  pending: "Pending",
  running: "Running",
  completed: "Completed",
  failed: "Failed",
  skipped: "Skipped",
};

const DOT_STYLE: Record<Status, keyof typeof styles> = {
  pending: "dotPending",
  running: "dotRunning",
  completed: "dotCompleted",
  failed: "dotFailed",
  skipped: "dotSkipped",
};

export function StatusBadge({ status, label }: { status: Status; label?: string }) {
  return (
    <span style={styles.root}>
      <span
        className={status === "running" ? "status-dot-pulse" : undefined}
        style={{ ...styles.dot, ...styles[DOT_STYLE[status]] }}
      />
      {label ?? LABELS[status]}
    </span>
  );
}
