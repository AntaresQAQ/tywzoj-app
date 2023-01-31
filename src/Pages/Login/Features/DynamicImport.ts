export function loadLoginPage() {
  return import("./LoginPage").then(({ LoginPage }) => ({ default: LoginPage }));
}
