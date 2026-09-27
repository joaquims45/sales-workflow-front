import { useAnalytics } from "./hooks/useAnalytics";
import { styles } from "./styles";

function formatMs(value: number | null): string {
  return value === null ? "—" : `${value.toFixed(1)} ms`;
}

function formatPercent(value: number | null): string {
  return value === null ? "—" : `${Math.round(value * 100)}%`;
}

export default function Analytics() {
  const { conversationId, summary, error } = useAnalytics();

  if (conversationId === null) {
    return (
      <div style={styles.container}>
        <h1>Analytics</h1>
        <p>Todavía no hay una conversación activa. Andá al Chat para iniciar una.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <h1>Analytics</h1>
        <p role="alert">{error}</p>
      </div>
    );
  }

  if (!summary) {
    return (
      <div style={styles.container}>
        <h1>Analytics</h1>
        <p>Cargando métricas…</p>
      </div>
    );
  }

  const maxRoutingCount = Math.max(1, ...summary.routingDecisions.map((row) => row.count));

  return (
    <div style={styles.container}>
      <h1>Analytics</h1>
      <p>
        Resumen de la conversación #{conversationId}. No hay todavía un endpoint agregado en el backend —
        esto se calcula a partir de su trace.
      </p>

      <div style={styles.statGrid}>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Eventos totales</p>
          <p style={styles.statValue}>{summary.totalEvents}</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Confidence prom. Jev</p>
          <p style={styles.statValue}>{formatPercent(summary.averageJevConfidence)}</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Latencia prom. Jev</p>
          <p style={styles.statValue}>{formatMs(summary.averageJevLatencyMs)}</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Latencia prom. por turno</p>
          <p style={styles.statValue}>{formatMs(summary.averageTurnLatencyMs)}</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Escalaciones (confidence &lt; 85%)</p>
          <p style={styles.statValue}>{summary.escalationCount}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2>Routing decisions</h2>
        {summary.routingDecisions.length === 0 ? (
          <p>Todavía no hay decisiones de routing registradas.</p>
        ) : (
          summary.routingDecisions.map((row) => (
            <div key={row.decision} style={styles.barRow}>
              <span style={styles.barLabel}>{row.decision}</span>
              <div style={styles.barTrack}>
                <div style={{ ...styles.barFill, width: `${(row.count / maxRoutingCount) * 100}%` }} />
              </div>
              <span style={styles.barCount}>{row.count}</span>
            </div>
          ))
        )}
      </div>

      <div style={styles.section}>
        <h2>Eventos por tipo</h2>
        {summary.eventCounts.map((row) => (
          <div key={row.eventType} style={styles.barRow}>
            <span style={styles.barLabel}>{row.eventType}</span>
            <span style={styles.barCount}>{row.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
