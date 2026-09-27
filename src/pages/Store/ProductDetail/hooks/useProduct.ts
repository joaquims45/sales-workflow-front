import { useEffect, useState } from "react";

import { ApiError } from "@/hooks/api";
import { getProduct } from "@/services/catalogService";
import type { Product } from "@/types/sales";

interface UseProductResult {
  product: Product | null;
  isLoading: boolean;
  error: string | null;
  notFound: boolean;
}

export function useProduct(productId: number): UseProductResult {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setError(null);
    setNotFound(false);

    getProduct(productId)
      .then((data) => {
        if (!cancelled) setProduct(data);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 404) {
          setNotFound(true);
        } else {
          setError("No pudimos cargar este producto. Intentá de nuevo más tarde.");
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [productId]);

  return { product, isLoading, error, notFound };
}
