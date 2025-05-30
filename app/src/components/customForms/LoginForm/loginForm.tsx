import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import "./loginForm.css";
import type { AuthErrorsType, LoginType } from "../../../types/auth.type";
import {
  LoginSchema,
  type LoginFormValues,
} from "../../../models/auth/auth.model";
import InputForm from "../../customInput/customInput";

interface Props {
  handleSingIn: (user: LoginType) => void;
  serverErrors: AuthErrorsType;
}

export const LoginForm = ({ handleSingIn, serverErrors }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // console.log(serverErrors);

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    handleSingIn(data);
  };

  return (
    <div className="Form">
      <h1>Login</h1>
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
        {serverErrors && <p className="error">{serverErrors.password}</p>}
        <div className="Buttons">
          <button className="Button-submit" type="submit">
            Login
          </button>
          <Link to={"/register"} className="Button-submit">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};
