import type { ReactNode } from "react";
import { BrowserRouter, Navigate, Route } from "react-router-dom";
import "./App.css";
import { RoutesWithNotFound } from "./components/routes/routesWithNotFound/routesWithNotFound";
import { PublicRoutes } from "./components/routes/publicRoutes/publicRoutes";
import { PrivateRouter } from "./components/routes/privateRouter/privateRouter";
import { PrivateGuard } from "./guard/privateGuard";

interface Props {
  children: ReactNode;
}

export const AppRouter = ({ children }: Props) => {
  return (
    <>
      <BrowserRouter>
        <RoutesWithNotFound>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/*" element={<PublicRoutes />} />
          <Route element={<PrivateGuard />}>
            <Route path="/private/*" element={<PrivateRouter />} />
          </Route>
        </RoutesWithNotFound>
        {children}
      </BrowserRouter>
    </>
  );
};
