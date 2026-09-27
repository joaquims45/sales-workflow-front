import { useCallback, useEffect, useState } from "react";

import { useConversationEvents } from "@/hooks/api";
import { getCheckoutStatus, getStoredConversationId } from "@/services/conversationsService";
import { approveMockPayment, rejectMockPayment } from "@/services/paymentsService";
import type { CheckoutStatus } from "@/types/sales";

interface UseCheckoutStatusResult {
  conversationId: number | null;
  checkoutStatus: CheckoutStatus | null;
  error: string | null;
  isUpdating: boolean;
  approve: () => void;
  reject: () => void;
}

export function useCheckoutStatus(): UseCheckoutStatusResult {
  const [conversationId] = useState(() => getStoredConversationId());
  const [checkoutStatus, setCheckoutStatus] = useState<CheckoutStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // New order.created/checkout.created events mean there's something new
  // to fetch; a payment approved/rejected via the buttons below refreshes
  // itself directly (see simulate()).
  const { events } = useConversationEvents(conversationId);

  const refresh = useCallback(() => {
    if (conversationId === null) return;

    getCheckoutStatus(conversationId)
      .then(setCheckoutStatus)
      .catch(() => setError("No pudimos cargar el estado del pago."));
  }, [conversationId]);

  useEffect(() => {
    refresh();
  }, [refresh, events.length]);

  function simulate(action: (checkoutUrl: string) => Promise<{ status: string }>) {
    if (!checkoutStatus?.checkout_url) return;

    setIsUpdating(true);
    setError(null);

    action(checkoutStatus.checkout_url)
      .then(refresh)
      .catch(() => setError("No pudimos actualizar el pago. Intentá de nuevo."))
      .finally(() => setIsUpdating(false));
  }

  return {
    conversationId,
    checkoutStatus,
    error,
    isUpdating,
    approve: () => simulate(approveMockPayment),
    reject: () => simulate(rejectMockPayment),
  };
}
