import { createContext, useContext } from "react";
import type { Product, ProductFormData } from "../../types/products.type";


interface ProductContextType {
  products: Product[];
  token: string | null;
  GetProducts: () => void;
  DeleteProduct: (id: string) => Promise<boolean>;
  CreateProduct: (data: ProductFormData) => Promise<boolean>;
  EditProduct: (id: string, data: Partial<ProductFormData>) => Promise<boolean>;
  setToken: (value: string | null) => void;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProduct = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context;
}
