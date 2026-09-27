import type { CSSProperties } from "react";

import type { PaymentStatus } from "@/types/sales";

import { useCheckoutStatus } from "./hooks/useCheckoutStatus";
import { styles } from "./styles";

const BADGE_STYLE: Record<PaymentStatus, CSSProperties> = {
  PENDING: styles.badgePending,
  APPROVED: styles.badgeApproved,
  REJECTED: styles.badgeRejected,
  CANCELLED: styles.badgeCancelled,
};

export default function Checkout() {
  const { conversationId, checkoutStatus, error, isUpdating, approve, reject } = useCheckoutStatus();

  if (conversationId === null) {
    return (
      <div style={styles.container}>
        <h1>Checkout</h1>
        <p>Todavía no hay una conversación activa. Andá al Chat para iniciar una.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <h1>Checkout</h1>
        <p role="alert">{error}</p>
      </div>
    );
  }

  if (!checkoutStatus || !checkoutStatus.order) {
    return (
      <div style={styles.container}>
        <h1>Checkout</h1>
        <p>Todavía no creaste ninguna orden. Decile al asistente en el Chat qué producto querés comprar.</p>
      </div>
    );
  }

  const { order, payment_status: paymentStatus, provider } = checkoutStatus;
  const isMock = provider === "mock";
  const canSimulate = isMock && paymentStatus === "PENDING";

  return (
    <div style={styles.container}>
      <h1>Checkout</h1>

      <div style={styles.card}>
        <div style={styles.row}>
          <span style={styles.label}>Orden</span>
          <span>#{order.id}</span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Total</span>
          <span>${order.total}</span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Estado de la orden</span>
          <span>{order.status}</span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Estado del pago</span>
          <span style={paymentStatus ? BADGE_STYLE[paymentStatus] : undefined}>{paymentStatus ?? "—"}</span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Provider</span>
          <span>{provider}</span>
        </div>

        {canSimulate && (
          <div style={styles.actions}>
            <button type="button" onClick={approve} disabled={isUpdating}>
              Simular pago aprobado
            </button>
            <button type="button" onClick={reject} disabled={isUpdating}>
              Simular pago rechazado
            </button>
          </div>
        )}
      </div>

      {isMock && (
        <p style={styles.note}>
          Este es un pago simulado (MockPaymentProvider) — no hay ninguna pasarela real de por medio.
        </p>
      )}
    </div>
  );
}
