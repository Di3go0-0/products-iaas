import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .email("The email is invalid")
      .min(1, "The email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        "Password must contain at least one uppercase, lowercase and a number or special character"
      ),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        "Password must contain at least one uppercase, lowercase and a number or special character"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    // validamos que las dos passwords sean iguales
    message: "The password no match",
    path: ["confirmPassword"], // path es el campo que queremos validar
  });


export const LoginSchema = z
  .object({
    email: z
      .string()
      .email("The email is invalid")
      .min(1, "The email is required"),
    password: z.string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        "Password must contain at least one uppercase, lowercase and a number or special character"
      ),

  });

export type FormValues = z.infer<typeof RegisterSchema>; // inferimos el tipo del schema.
export type LoginFormValues = z.infer<typeof LoginSchema>; // inferimos el tipo del schema.
