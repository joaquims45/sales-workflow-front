import { ProductCard } from "./components/ProductCard";
import { useProducts } from "./hooks/useProducts";
import { styles } from "./styles";

export default function Store() {
  const { products, isLoading, error } = useProducts();

  return (
    <div style={styles.container}>
      <h1>Store</h1>

      {isLoading && <p>Cargando catálogo…</p>}
      {error && <p role="alert">{error}</p>}

      {!isLoading && !error && products.length === 0 && <p>No hay productos disponibles todavía.</p>}

      {!isLoading && !error && products.length > 0 && (
        <div style={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
