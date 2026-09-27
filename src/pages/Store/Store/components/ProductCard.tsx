import { Link } from "react-router-dom";

import type { Product } from "@/types/sales";

import { styles } from "../styles";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/store/products/${product.id}`} style={styles.card}>
      <h2 style={styles.cardTitle}>{product.name}</h2>
      <p style={styles.cardCategory}>{product.category.name}</p>
      <p style={styles.cardPrice}>${product.price}</p>
    </Link>
  );
}
