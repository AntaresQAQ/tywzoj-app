import { ILoginPageState } from "@/Pages/Login/Features/Types";

export interface IPagesState {
  homePage: unknown;

  loginPage: ILoginPageState;
  registerPage: unknown;
  forgotPasswordPage: unknown;

  userListPage: unknown;
  userDetailPage: unknown;
  userEditPage: unknown;
  userSettingPage: unknown;

  problemListPage: unknown;
  problemDetailPage: unknown;
}
