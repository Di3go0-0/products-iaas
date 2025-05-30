import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../../context/authContext/Auth.Context";
import { RegisterForm } from "../../../components/customForms/RegisterForm/RegisterForm";
import "../css/auth.css";

export const Register = () => {
  const { SignUp, errors, isRegistered } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isRegistered) {
      navigate("/login");
    }
  }, [isRegistered, navigate]);

  return (
    <div className="gradient-background">
      <RegisterForm handleSingUp={SignUp} serverErrors={errors} />
    </div>
  );
};
