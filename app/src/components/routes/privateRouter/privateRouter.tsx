import { Route } from "react-router-dom";
// import { Home } from "../../../Pages";
// import { ProjectGuard } from "../../../Guard";
import { RoutesWithNotFound } from "../routesWithNotFound/routesWithNotFound";
import { Navbar } from "../../navbar/nav";

export const PrivateRouter = () => {
  return (
    <>
      <Navbar />
      <RoutesWithNotFound>
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/home" element={<div>hola</div>} />
      </RoutesWithNotFound>
    </>
  );
};
