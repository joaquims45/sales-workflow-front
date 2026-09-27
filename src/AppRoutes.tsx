import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const StoreModule = lazy(() => import("./modules/store"));
const ChatModule = lazy(() => import("./modules/chat"));
const CheckoutModule = lazy(() => import("./modules/checkout"));
const ObservabilityModule = lazy(() => import("./modules/observability"));
const AnalyticsModule = lazy(() => import("./modules/analytics"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/store" replace />} />
        <Route path="/store/*" element={<StoreModule />} />
        <Route path="/chat/*" element={<ChatModule />} />
        <Route path="/checkout/*" element={<CheckoutModule />} />
        <Route path="/observability/*" element={<ObservabilityModule />} />
        <Route path="/analytics/*" element={<AnalyticsModule />} />
      </Routes>
    </Suspense>
  );
}
