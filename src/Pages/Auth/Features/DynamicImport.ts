export function loadLoginPage() {
  return import("./LoginPage/LoginPage").then(({ LoginPage }) => ({ default: LoginPage }));
}

export function loadRegisterPage() {
  return import("./RegisterPage/RegisterPage").then(({ RegisterPage }) => ({ default: RegisterPage }));
}

export function loadForgotPasswordPage() {
  return import("./ForgotPasswordPage/ForgotPasswordPage").then(({ ForgotPasswordPage }) => ({
    default: ForgotPasswordPage,
  }));
}
