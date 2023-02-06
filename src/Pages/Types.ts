import { ILoginPageState } from "./Auth/LoginPage/Types";
import { IUserDetailPageState } from "./User/UserDetailPage/Types";
import { IUserListPageState } from "./User/UserListPage/Types";

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
