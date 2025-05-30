import App from "./App";
import { AppRouter } from "./AppRouter";
import { AuthProvider } from "./context/authContext/AuthContext";

const AppHookContainer = () => {
  return (
    <div className="">
      <AuthProvider>
        {/* <TaskProvider> */}
        <AppRouter>
          <App />
        </AppRouter>
        {/* </TaskProvider> */}
      </AuthProvider>
    </div>
  );
};
export default AppHookContainer;
