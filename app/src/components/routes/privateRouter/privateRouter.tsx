import { Route } from "react-router-dom";
import { RoutesWithNotFound } from "../routesWithNotFound/routesWithNotFound";
import { Navbar } from "../../navbar/nav";
import ProductsPage from "../../../pages/public/products/products";

export const PrivateRouter = () => {
  return (
    <>
      <Navbar />
      <RoutesWithNotFound>
        <Route path="/home" element={<ProductsPage />} />
      </RoutesWithNotFound>
    </>
  );
};
