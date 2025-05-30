"use client";

import type React from "react";

import { useState, useEffect } from "react";
import "./product-form.css";
import type { Product, ProductFormData } from "../../../types/products.type";

interface Props {
  product?: Product | null;
  onSave: (data: ProductFormData) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export const ProductForm = ({ product, onSave, onCancel, isOpen }: Props) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    unitprice: 0,
    stock: 0,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        unitprice: product.unitprice,
        stock: product.stock,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        unitprice: 0,
        stock: 0,
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "unitprice" || name === "stock" ? Number(value) : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{product ? "Edit Product" : "Create New Product"}</h2>
          <button className="close-btn" onClick={onCancel}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="form-textarea"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="unitprice">Unit Price ($)</label>
              <input
                type="number"
                id="unitprice"
                name="unitprice"
                value={formData.unitprice}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {product ? "Update" : "Create"} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
