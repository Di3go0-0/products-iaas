"use client";

import { useEffect, useState } from "react";
import "./products.css";
import { ProductForm } from "../../../components/customForms/ProductForm/product-form";
import { ProductCard } from "../../../components/products/productCard/product-card";
import type { Product, ProductFormData } from "../../../types/products.type";
import { useAuth } from "../../../context/authContext/Auth.Context";
import { useProduct } from "../../../context/productsContext/Product.Context";

function ProductsPage() {
  const { token } = useAuth();
  console.log("hola");
  const {
    products,
    setToken,
    GetProducts,
    CreateProduct,
    EditProduct,
    DeleteProduct,
  } = useProduct();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  console.log("hola2");
  useEffect(() => {
    if (token) {
      setToken(token);
      GetProducts();
    }
  }, [token]);

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    await DeleteProduct(id);
  };

  const handleSaveProduct = async (data: ProductFormData) => {
    let success = false;

    if (editingProduct) {
      success = await EditProduct(editingProduct.id, data);
    } else {
      success = await CreateProduct(data);
    }

    if (success) {
      setIsFormOpen(false);
      setEditingProduct(null);
    }
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  console.log("hola1");
  return (
    <div className="products-page">
      <div className="products-container">
        <div className="products-header">
          <h1>Products Management</h1>
          <button className="create-btn" onClick={handleCreateProduct}>
            Create New Product
          </button>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEditProduct}
              onDelete={() => handleDeleteProduct(product.id)}
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="empty-state">
            <h3>No products found</h3>
            <p>Create your first product to get started</p>
          </div>
        )}
      </div>

      <ProductForm
        product={editingProduct}
        onSave={handleSaveProduct}
        onCancel={handleCancelForm}
        isOpen={isFormOpen}
      />
    </div>
  );
}

export default ProductsPage;
