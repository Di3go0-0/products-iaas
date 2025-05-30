import type { Product, ProductFormData } from "../../types/products.type";
import axios from "../products.axios";

export const Get = async () => {
  const response = await axios.get('/');
  return response;
}

export const GetById = async (id: string) => {
  const response = await axios.get(`/${id}`);
  return response;
}

export const Create = async (body: Product) => {
  const response = await axios.post('', body);
  return response;
}
export const Update = async (id: string, product: ProductFormData) => {
  const response = await axios.put(`/${id}`, product);
  return response;
}

export const Delete = async (id: string) => {
  const response = await axios.delete(`/${id}`);
  return response;
}


