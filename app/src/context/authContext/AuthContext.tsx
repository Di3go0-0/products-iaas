import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./Auth.Context";
import type {
  AuthErrorsType,
  LoginType,
  RegisterType,
} from "../../types/auth.type";
import { LoginRequest, RegisterRequest } from "../../api/auth/auth";
import axios from "../../api/products.axios";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<AuthErrorsType>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    // Si hay token, está autenticado
    if (token) {
      setIsAuthenticated(true);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      setIsAuthenticated(false);
      delete axios.defaults.headers.common["Authorization"];
    }
    setIsLoading(false);
  }, [token]);

  const SingIn = async (user: LoginType) => {
    try {
      const response = await LoginRequest(user);
      const accessToken = response.data.token;

      setToken(accessToken);
      setErrors({});
    } catch (err: any) {
      setErrors(err.response?.data || { message: "Error al iniciar sesión" });
      setToken(null);
    }
  };

  const SignUp = async (user: RegisterType) => {
    try {
      const response = await RegisterRequest(user);
      if (response.status === 201) {
        setIsRegistered(true);
        setErrors({});
      }
    } catch (err: any) {
      setErrors(err.response?.data || { message: "Error al registrarse" });
    }
  };

  const Logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    setIsRegistered(false);
    setErrors({});
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        token,
        setToken,
        SingIn,
        SignUp,
        Logout,
        isLoading,
        errors,
        isRegistered,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
