import { apiGet, apiPost } from "@/hooks/api";
import type { Category, Product } from "@/types/sales";

export function listProducts(): Promise<Product[]> {
  return apiGet<Product[]>("/api/catalog/products/");
}

export function getProduct(productId: number): Promise<Product> {
  return apiGet<Product>(`/api/catalog/products/${productId}/`);
}

export function listCategories(): Promise<Category[]> {
  return apiGet<Category[]>("/api/catalog/categories/");
}

export function createCategory(name: string): Promise<Category> {
  return apiPost<Category>("/api/catalog/categories/", { name });
}

export interface NewProductInput {
  name: string;
  description: string;
  category: number;
  price: string;
  stock: number;
  use_cases: string[];
}

export function createProduct(input: NewProductInput): Promise<Product> {
  return apiPost<Product>("/api/catalog/products/", input);
}
