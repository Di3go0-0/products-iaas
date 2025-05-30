import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "../routesWithNotFound/routesWithNotFound";
import { Login } from "../../../pages/public/login/login";
import { Register } from "../../../pages/public/register/register";

export const PublicRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </RoutesWithNotFound>
  );
};
