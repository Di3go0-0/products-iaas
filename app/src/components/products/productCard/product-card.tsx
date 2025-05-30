"use client";

import type { Product } from "../../../types/products.type";
import "./product-card.css";

interface Props {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductCard = ({ product, onEdit, onDelete }: Props) => {
  const handleEdit = () => {
    onEdit(product);
  };

  const handleDelete = () => {
    if (window.confirm(`¿Do you wanna delete this "${product.name}"?`)) {
      onDelete(product.id);
    }
  };

  return (
    <div className="product-card">
      <div className="product-header">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-actions">
          <button className="edit-btn" onClick={handleEdit}>
            Edit
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className="product-body">
        <p className="product-description">{product.description}</p>

        <div className="product-details">
          <div className="detail-item">
            <span className="detail-label">Price:</span>
            <span className="detail-value">
              ${typeof product.unitprice === 'number' 
                ? product.unitprice.toFixed(2) 
                : Number(product.unitprice).toFixed(2)}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Stock:</span>
            <span className="detail-value">{product.stock} units</span>
          </div>
        </div>
      </div>
    </div>
  );
};
