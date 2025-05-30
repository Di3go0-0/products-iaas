import { createContext, useContext } from "react";
import type { AuthErrorsType, LoginType, RegisterType } from "../../types/auth.type";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  SingIn: (user: LoginType) => Promise<void>;
  SignUp: (user: RegisterType) => Promise<void>;
  Logout: () => void;
  isLoading: boolean;
  setIsAuthenticated: (value: boolean) => void;
  setToken: (value: string | null) => void;
  errors: AuthErrorsType;
  isRegistered: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

