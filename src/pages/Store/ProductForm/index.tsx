import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import { useProductForm } from "./hooks/useProductForm";
import { styles } from "./styles";

const NEW_CATEGORY_VALUE = "__new__";

export default function ProductForm() {
  const { categories, isSubmitting, error, createdProduct, submit } = useProductForm();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categorySelection, setCategorySelection] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("0");
  const [useCases, setUseCases] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    submit({
      name,
      description,
      categoryId: categorySelection && categorySelection !== NEW_CATEGORY_VALUE ? Number(categorySelection) : null,
      newCategoryName: categorySelection === NEW_CATEGORY_VALUE ? newCategoryName : "",
      price,
      stock,
      useCases,
    });
  }

  return (
    <div style={styles.container}>
      <Link to="/store" style={styles.backLink}>
        ← Volver al catálogo
      </Link>

      <h1>Agregar producto</h1>

      <form onSubmit={handleSubmit}>
        <div style={styles.field}>
          <label style={styles.label} htmlFor="product-name">
            Nombre
          </label>
          <input
            id="product-name"
            style={styles.input}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="product-description">
            Descripción
          </label>
          <textarea
            id="product-description"
            style={styles.textarea}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="product-category">
            Categoría
          </label>
          <select
            id="product-category"
            style={styles.input}
            value={categorySelection}
            onChange={(event) => setCategorySelection(event.target.value)}
          >
            <option value="">Elegí una categoría…</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
            <option value={NEW_CATEGORY_VALUE}>+ Nueva categoría</option>
          </select>
        </div>

        {categorySelection === NEW_CATEGORY_VALUE && (
          <div style={styles.field}>
            <label style={styles.label} htmlFor="new-category-name">
              Nombre de la nueva categoría
            </label>
            <input
              id="new-category-name"
              style={styles.input}
              value={newCategoryName}
              onChange={(event) => setNewCategoryName(event.target.value)}
            />
          </div>
        )}

        <div style={styles.row}>
          <div style={{ ...styles.field, ...styles.rowField }}>
            <label style={styles.label} htmlFor="product-price">
              Precio
            </label>
            <input
              id="product-price"
              style={styles.input}
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="1400000.00"
            />
          </div>
          <div style={{ ...styles.field, ...styles.rowField }}>
            <label style={styles.label} htmlFor="product-stock">
              Stock
            </label>
            <input
              id="product-stock"
              style={styles.input}
              type="number"
              min="0"
              value={stock}
              onChange={(event) => setStock(event.target.value)}
            />
          </div>
        </div>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="product-use-cases">
            Casos de uso (separados por coma)
          </label>
          <input
            id="product-use-cases"
            style={styles.input}
            value={useCases}
            onChange={(event) => setUseCases(event.target.value)}
            placeholder="gaming, programming"
          />
        </div>

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creando…" : "Crear producto"}
        </button>
      </form>

      {createdProduct && (
        <div style={styles.success}>
          <p>
            Producto creado: <strong>{createdProduct.name}</strong> (#{createdProduct.id})
          </p>
          <Link to={`/store/products/${createdProduct.id}`}>Ver ficha del producto →</Link>
        </div>
      )}
    </div>
  );
}
