import { useEffect, useState, type ReactNode } from "react";
import type { Product, ProductFormData } from "../../types/products.type";
import { ProductContext } from "./Product.Context";
import * as ProductService from "../../api/product/product";
import axios from "../../api/products.axios";

interface Props {
  children: ReactNode;
}

export const ProductProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const GetProducts = async () => {
    if (hasFetched) return;
    try {
      const response = await ProductService.Get();
      setProducts(response.data);
      setHasFetched(true);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const DeleteProduct = async (id: string): Promise<boolean> => {
    try {
      await ProductService.Delete(id.toString());
      setProducts((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      return false;
    }
  };

  const CreateProduct = async (data: ProductFormData): Promise<boolean> => {
    try {
      const response = await ProductService.Create(data as Product);
      setProducts((prev) => [...prev, response.data]);
      return true;
    } catch (error) {
      console.error("Error al crear producto:", error);
      return false;
    }
  };

  const EditProduct = async (
    id: string,
    data: Partial<ProductFormData>,
  ): Promise<boolean> => {
    try {
      const response = await ProductService.Update(
        id.toString(),
        data as ProductFormData,
      );
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...response.data } : p)),
      );
      return true;
    } catch (error) {
      console.error("Error al editar producto:", error);
      return false;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        token,
        GetProducts,
        DeleteProduct,
        CreateProduct,
        EditProduct,
        setToken,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
