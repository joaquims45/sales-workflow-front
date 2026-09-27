import { Route, Routes } from "react-router-dom";

import ProductDetail from "@/pages/Store/ProductDetail";
import ProductForm from "@/pages/Store/ProductForm";
import Store from "@/pages/Store/Store";

export default function StoreModule() {
  return (
    <Routes>
      <Route index element={<Store />} />
      <Route path="new" element={<ProductForm />} />
      <Route path="products/:productId" element={<ProductDetail />} />
    </Routes>
  );
}
