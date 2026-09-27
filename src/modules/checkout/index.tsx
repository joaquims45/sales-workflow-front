import { Route, Routes } from "react-router-dom";

import Checkout from "../../pages/Checkout/Checkout";

export default function CheckoutModule() {
  return (
    <Routes>
      <Route index element={<Checkout />} />
    </Routes>
  );
}
