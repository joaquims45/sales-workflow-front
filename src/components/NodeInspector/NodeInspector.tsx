import { CollapsibleSection } from "@/components/CollapsibleSection";
import { StatusBadge } from "@/components/StatusBadge";
import type { WorkflowEventMessage } from "@/types/sales";

import { deriveNodeDetail } from "./deriveNodeDetail";
import { styles } from "./styles";

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export function NodeInspector({
  nodeName,
  events,
  onClose,
}: {
  nodeName: string;
  events: WorkflowEventMessage[];
  onClose: () => void;
}) {
  const detail = deriveNodeDetail(events, nodeName);

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <div>
          <div style={styles.nodeName}>{detail.name}</div>
          <StatusBadge status={detail.status} />
        </div>
        <button type="button" style={styles.closeButton} onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>

      <CollapsibleSection title="Metadata">
        <dl style={styles.fieldList}>
          <div style={styles.field}>
            <dt style={styles.fieldLabel}>Workflow</dt>
            <dd style={styles.fieldValue}>{detail.workflow ?? "—"}</dd>
          </div>
          <div style={styles.field}>
            <dt style={styles.fieldLabel}>Started</dt>
            <dd style={styles.fieldValue}>{detail.startedAt ? formatTime(detail.startedAt) : "—"}</dd>
          </div>
          <div style={styles.field}>
            <dt style={styles.fieldLabel}>Completed</dt>
            <dd style={styles.fieldValue}>{detail.completedAt ? formatTime(detail.completedAt) : "—"}</dd>
          </div>
          <div style={styles.field}>
            <dt style={styles.fieldLabel}>Duration</dt>
            <dd style={styles.fieldValue}>
              {detail.durationMs !== null ? `${Math.round(detail.durationMs)}ms` : "—"}
            </dd>
          </div>
        </dl>
      </CollapsibleSection>

      <CollapsibleSection title="Triggering message">
        {detail.triggeringMessage ? (
          <p style={styles.message}>{detail.triggeringMessage}</p>
        ) : (
          <p style={styles.empty}>No message triggered this node this turn.</p>
        )}
      </CollapsibleSection>

      <CollapsibleSection title="Routing decision">
        {detail.routingDecision ? (
          <dl style={styles.fieldList}>
            <div style={styles.field}>
              <dt style={styles.fieldLabel}>Decision</dt>
              <dd style={styles.fieldValue}>{detail.routingDecision}</dd>
            </div>
            <div style={styles.field}>
              <dt style={styles.fieldLabel}>Confidence</dt>
              <dd style={styles.fieldValue}>
                {detail.routingConfidence !== null ? `${Math.round(detail.routingConfidence * 100)}%` : "—"}
              </dd>
            </div>
          </dl>
        ) : (
          <p style={styles.empty}>No routing decision was made this turn (e.g. a shipping-query follow-up).</p>
        )}
      </CollapsibleSection>

      {detail.error && (
        <CollapsibleSection title="Error">
          <p style={styles.error}>{detail.error}</p>
        </CollapsibleSection>
      )}
    </div>
  );
}
