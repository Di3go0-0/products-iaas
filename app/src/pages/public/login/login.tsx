import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../../components/customForms/LoginForm/loginForm";
import { useAuth } from "../../../context/authContext/Auth.Context";
import "../css/auth.css";

export const Login = () => {
  const { SingIn, isAuthenticated, errors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/private/home/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="gradient-background">
      <LoginForm handleSingIn={SingIn} serverErrors={errors} />
    </div>
  );
};
