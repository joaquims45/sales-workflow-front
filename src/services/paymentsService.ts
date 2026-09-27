import { apiPost } from "@/hooks/api";

// Dev-only endpoints that simulate a gateway for MockPaymentProvider
// (apps/payments/views.py). `checkoutUrl` is whatever
// GET /api/conversations/{id}/checkout/ returned — these just append the
// action to it, since the backend already gives us the full path.

export function approveMockPayment(checkoutUrl: string): Promise<{ status: string }> {
  return apiPost<{ status: string }>(`${checkoutUrl}approve/`);
}

export function rejectMockPayment(checkoutUrl: string): Promise<{ status: string }> {
  return apiPost<{ status: string }>(`${checkoutUrl}reject/`);
}
