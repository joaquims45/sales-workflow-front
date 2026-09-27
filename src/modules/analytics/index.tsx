import { Route, Routes } from "react-router-dom";

import Analytics from "@/pages/Analytics/Analytics";

export default function AnalyticsModule() {
  return (
    <Routes>
      <Route index element={<Analytics />} />
    </Routes>
  );
}
