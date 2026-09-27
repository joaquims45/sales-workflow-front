import { Link, useParams } from "react-router-dom";

import { useProduct } from "./hooks/useProduct";
import { styles } from "./styles";

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const numericProductId = Number(productId);
  const isValidId = productId !== undefined && Number.isInteger(numericProductId);

  const { product, isLoading, error, notFound } = useProduct(isValidId ? numericProductId : NaN);

  return (
    <div style={styles.container}>
      <Link to="/store" style={styles.backLink}>
        ← Volver al catálogo
      </Link>

      {(!isValidId || notFound) && <p>No encontramos ese producto.</p>}
      {isValidId && isLoading && <p>Cargando producto…</p>}
      {isValidId && error && <p role="alert">{error}</p>}

      {isValidId && !isLoading && !error && !notFound && product && (
        <>
          <h1>{product.name}</h1>
          <p style={styles.category}>{product.category.name}</p>
          <p style={styles.price}>${product.price}</p>
          <p style={styles.stock}>{product.stock > 0 ? `${product.stock} disponibles` : "Sin stock"}</p>

          <p>{product.description}</p>

          {product.use_cases.length > 0 && (
            <ul style={styles.featureList}>
              {product.use_cases.map((useCase) => (
                <li key={useCase} style={styles.featureTag}>
                  {useCase}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
