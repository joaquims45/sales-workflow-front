import { useSalesState } from "./hooks/useSalesState";
import { styles } from "./styles";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={styles.section}>
      <p style={styles.label}>{label}</p>
      <p style={styles.value}>{value}</p>
    </div>
  );
}

export default function WorkflowBrain() {
  const { conversationId, salesState, error } = useSalesState();

  if (conversationId === null) {
    return (
      <div style={styles.container}>
        <h1>Workflow Brain</h1>
        <p>Todavía no hay una conversación activa. Andá al Chat para iniciar una.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>Workflow Brain</h1>
      <p>Conversación #{conversationId}</p>

      {error && <p role="alert">{error}</p>}
      {!error && !salesState && <p>Cargando estado…</p>}

      {salesState && (
        <div style={styles.grid}>
          <Field label="Primary goal" value={salesState.primary_goal ?? "—"} />
          <Field label="Funnel stage" value={salesState.funnel_stage} />
          <Field label="Active workflow" value={salesState.active_workflow ?? "—"} />
          <Field label="Active node" value={salesState.active_node ?? "—"} />
          <Field label="Suspended workflow" value={salesState.suspended_workflow ?? "—"} />
          <Field label="Interruption" value={salesState.interruption ?? "—"} />
          <Field
            label="Routing"
            value={
              salesState.routing_decision
                ? `${salesState.routing_decision} (${Math.round((salesState.routing_confidence ?? 0) * 100)}%)`
                : "—"
            }
          />
          <Field label="Checkout ready" value={salesState.checkout_ready ? "Sí" : "No"} />

          <div style={styles.section}>
            <p style={styles.label}>Customer needs</p>
            {salesState.customer_needs.length === 0 ? (
              <p style={styles.value}>—</p>
            ) : (
              <ul style={styles.tagList}>
                {salesState.customer_needs.map((need) => (
                  <li key={need} style={styles.tag}>
                    {need}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div style={styles.section}>
            <p style={styles.label}>Constraints</p>
            <p style={styles.value}>
              {Object.keys(salesState.constraints).length === 0
                ? "—"
                : JSON.stringify(salesState.constraints)}
            </p>
          </div>

          <div style={styles.section}>
            <p style={styles.label}>Candidate products</p>
            <p style={styles.value}>
              {salesState.candidate_products.length === 0 ? "—" : salesState.candidate_products.join(", ")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
