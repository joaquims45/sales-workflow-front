import { useEffect, useState } from "react";

import { createCategory, createProduct, listCategories } from "@/services/catalogService";
import type { Category, Product } from "@/types/sales";

interface UseProductFormResult {
  categories: Category[];
  isSubmitting: boolean;
  error: string | null;
  createdProduct: Product | null;
  submit: (input: {
    name: string;
    description: string;
    categoryId: number | null;
    newCategoryName: string;
    price: string;
    stock: string;
    useCases: string;
  }) => void;
}

export function useProductForm(): UseProductFormResult {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdProduct, setCreatedProduct] = useState<Product | null>(null);

  useEffect(() => {
    listCategories()
      .then(setCategories)
      .catch(() => setError("No pudimos cargar las categorías."));
  }, []);

  function submit(input: {
    name: string;
    description: string;
    categoryId: number | null;
    newCategoryName: string;
    price: string;
    stock: string;
    useCases: string;
  }) {
    setError(null);

    if (!input.name.trim() || !input.description.trim() || !input.price.trim()) {
      setError("Completá nombre, descripción y precio.");
      return;
    }

    if (input.categoryId === null && !input.newCategoryName.trim()) {
      setError("Elegí una categoría o creá una nueva.");
      return;
    }

    setIsSubmitting(true);

    const useCases = input.useCases
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    const categoryPromise: Promise<number> =
      input.categoryId !== null
        ? Promise.resolve(input.categoryId)
        : createCategory(input.newCategoryName.trim()).then((category) => category.id);

    categoryPromise
      .then((categoryId) =>
        createProduct({
          name: input.name.trim(),
          description: input.description.trim(),
          category: categoryId,
          price: input.price.trim(),
          stock: Number(input.stock) || 0,
          use_cases: useCases,
        }),
      )
      .then((product) => {
        setCreatedProduct(product);
        // Reflect the (possibly new) category right away without a refetch.
        listCategories().then(setCategories).catch(() => {});
      })
      .catch(() => setError("No pudimos crear el producto. Revisá los datos e intentá de nuevo."))
      .finally(() => setIsSubmitting(false));
  }

  return { categories, isSubmitting, error, createdProduct, submit };
}
