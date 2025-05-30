import type { LoginType, RegisterType } from "../../types/auth.type.ts";
import axios from "../auth.axios.ts";

export const RegisterRequest = async (User: RegisterType) => {
  const response = await axios.post(`/register`, User);
  return response;
}

export const LoginRequest = async (User: LoginType) => {
  const response = await axios.post(`/login`, User);
  return response;
}

export const ValidateUserRequest = async () => {
  const response = await axios.post(`/validate`)
  return response;
}
