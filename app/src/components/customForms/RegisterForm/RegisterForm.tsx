import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import {
  RegisterSchema,
  type FormValues,
} from "../../../models/auth/auth.model";
import InputForm from "../../customInput/customInput";
import type { AuthErrorsType, RegisterType } from "../../../types/auth.type";
// import "./RegisterForm.css";

interface Props {
  handleSingUp: (user: RegisterType) => void;
  serverErrors: AuthErrorsType;
}

export const RegisterForm = ({ handleSingUp, serverErrors }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(RegisterSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    handleSingUp(data);
  };
  return (
    <div className="Form">
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputForm
          name="email"
          control={control}
          label="Email"
          type="email"
          error={errors.email}
        />
        {serverErrors && <p className="error">{serverErrors.mail}</p>}
        <InputForm
          name="password"
          control={control}
          label="Password"
          type="password"
          error={errors.password}
        />
        <InputForm
          name="confirmPassword"
          control={control}
          label="Confirm Password"
          type="password"
          error={errors.confirmPassword}
        />

        <div className="Buttons">
          <button type="submit" className="Button-submit">
            Register
          </button>
          <Link to={"/login"} className="Button-submit">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};
