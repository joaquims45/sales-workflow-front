import { Route, Routes } from "react-router-dom";

import Trace from "../../pages/Observability/Trace";
import WorkflowBrain from "../../pages/Observability/WorkflowBrain";
import WorkflowInspector from "../../pages/Observability/WorkflowInspector";

export default function ObservabilityModule() {
  return (
    <Routes>
      <Route index element={<WorkflowBrain />} />
      <Route path="inspector" element={<WorkflowInspector />} />
      <Route path="trace" element={<Trace />} />
    </Routes>
  );
}
