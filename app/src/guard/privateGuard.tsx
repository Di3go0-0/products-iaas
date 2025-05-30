import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext/Auth.Context";

export const PrivateGuard = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
