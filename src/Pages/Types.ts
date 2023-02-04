import { ILoginPageState } from "@/Pages/Auth/Features/LoginPage/Types";
import { IUserDetailPageState } from "@/Pages/User/Features/UserDetailPage/Types";
import { IUserListPageState } from "@/Pages/User/Features/UserListPage/Types";

export interface IPagesState {
  homePage: unknown;

  loginPage: ILoginPageState;
  registerPage: unknown;
  forgotPasswordPage: unknown;

  userListPage: IUserListPageState;
  userDetailPage: IUserDetailPageState;
  userEditPage: unknown;
  userSettingPage: unknown;

  problemListPage: unknown;
  problemDetailPage: unknown;
}
