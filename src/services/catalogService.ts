import { apiGet } from "@/hooks/api";
import type { Product } from "@/types/sales";

export function listProducts(): Promise<Product[]> {
  return apiGet<Product[]>("/api/catalog/products/");
}

export function getProduct(productId: number): Promise<Product> {
  return apiGet<Product>(`/api/catalog/products/${productId}/`);
}
