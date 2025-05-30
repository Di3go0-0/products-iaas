import App from "./App";
import { AppRouter } from "./AppRouter";
import { AuthProvider } from "./context/authContext/AuthContext";
import { ProductProvider } from "./context/productsContext/ProductProvider";

const AppHookContainer = () => {
  return (
    <div className="">
      <AuthProvider>
        <ProductProvider>
          <AppRouter>
            <App />
          </AppRouter>
        </ProductProvider>
      </AuthProvider>
    </div>
  );
};
export default AppHookContainer;
