import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./Auth.Context";
import type {
  AuthErrorsType,
  LoginType,
  RegisterType,
} from "../../types/auth.type";
import { LoginRequest, RegisterRequest } from "../../api/auth/auth";
import axios from "../../api/products.axios";
import { AxiosError } from "axios";

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
      setIsAuthenticated(true);
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e instanceof AxiosError) {
          if (e.response && Array.isArray(e.response.data)) {
            // console.log(e.response.data);
            return setErrors({ message: e.response.data[0] });
          }
          if (e.response && e.response.status == 401) {
            setErrors({ password: e.response.data.message });
            console.log(e.response.data);
          }
          if (e.response && e.response.status == 404) {
            setErrors({ mail: e.response.data.message });
            console.log(e.response.data.message);
          }
        }
      } else {
        console.error("Unexpected error", e);
      }
    }
  };

  const SignUp = async (user: RegisterType) => {
    try {
      const response = await RegisterRequest(user);

      if (response.status === 201) {
        setIsRegistered(true);
        setErrors({});
      }
    } catch (e: any) {
      if (e instanceof AxiosError) {
        if (e instanceof AxiosError) {
          if (e.response && Array.isArray(e.response.data)) {
            return setErrors({ message: e.response.data[0] });
          }
          if (e.response && e.response.data?.email) {
            setErrors({ mail: e.response.data.email });
            console.log(e.response.data.email);
          }
        }
      } else {
        console.error("Unexpected error", e);
      }
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
