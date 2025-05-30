export type RegisterType = {
  email: string;
  password: string,
  confirmPassword: string;
}

export type LoginType = {
  email: string;
  password: string;
}

export type AuthErrorsType = {
  message?: string;
  mail?: string;
  password?: string;
}

