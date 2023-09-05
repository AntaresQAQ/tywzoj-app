import { ILoginPageState } from "./Auth/LoginPage/Types";
import { IRegisterPageState } from "./Auth/RegisterPage/Types";
import { IProblemDetailPageState } from "./Problem/ProblemDetailPage/Types";
import { IProblemFilePageState } from "./Problem/ProblemFilePage/Types";
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
    problemFilePage: IProblemFilePageState;
}
