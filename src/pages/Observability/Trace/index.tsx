import { useTrace } from "./hooks/useTrace";
import { styles } from "./styles";

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toISOString().slice(11, 23); // HH:MM:SS.mmm
}

function formatPayload(payload: Record<string, unknown>): string {
  const entries = Object.entries(payload);
  if (entries.length === 0) return "—";
  return entries.map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join("  ·  ");
}

export default function Trace() {
  const { conversationId, rows, error } = useTrace();

  if (conversationId === null) {
    return (
      <div style={styles.container}>
        <h1>Trace</h1>
        <p>Todavía no hay una conversación activa. Andá al Chat para iniciar una.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>Trace</h1>
      <p>Conversación #{conversationId}</p>

      {error && <p role="alert">{error}</p>}
      {!error && rows.length === 0 && <p>Todavía no hay eventos para esta conversación.</p>}

      {rows.length > 0 && (
        <div style={styles.timeline}>
          {rows.map((row) => (
            <div key={row.key} style={styles.row}>
              <span style={styles.time}>{formatTime(row.created_at)}</span>
              <span style={styles.eventType}>{row.event_type}</span>
              <span style={styles.payload}>{formatPayload(row.payload)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
