import { Link } from "react-router-dom";

import { ProductCard } from "./components/ProductCard";
import { useProducts } from "./hooks/useProducts";
import { styles } from "./styles";

export default function Store() {
  const { products, isLoading, error } = useProducts();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Store</h1>
        <Link to="/store/new">+ Agregar producto</Link>
      </div>

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
