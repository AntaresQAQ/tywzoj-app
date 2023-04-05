import { IProblemDetailPageState } from "@/Pages/Problem/ProblemDetailPage/Types";

import { ILoginPageState } from "./Auth/LoginPage/Types";
import { IRegisterPageState } from "./Auth/RegisterPage/Types";
import { IUserDetailPageState } from "./User/UserDetailPage/Types";
import { IUserListPageState } from "./User/UserListPage/Types";

export interface IPagesState {
  homePage: unknown;

  loginPage: ILoginPageState;
  registerPage: IRegisterPageState;
  forgotPasswordPage: unknown;

  userListPage: IUserListPageState;
  userDetailPage: IUserDetailPageState;
  userEditPage: unknown;
  userSettingPage: unknown;

  problemListPage: unknown;
  problemDetailPage: IProblemDetailPageState;
}
