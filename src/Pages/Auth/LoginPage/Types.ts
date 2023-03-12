import { IUserBaseEntityWithExtra } from "@/Common/ServerType/User";
import { IUserPreferenceEntityWithExtra } from "@/Common/ServerType/UserPreference";
import { XOR } from "@/Common/Utilities/Types";

export const enum CE_LoginType {
  Username = "Username",
  Email = "Email",
}

export interface ILoginPageState {
  loginType: CE_LoginType;
  username: string;
  email: string;
  password: string;
  loading: boolean;
  uError: string;
  pError: string;
}

export type IPostLoginRequestBody = XOR<{ username: string }, { email: string }> & { password: string };
export interface IPostLoginResponse {
  token: string;
  userBaseDetail: IUserBaseEntityWithExtra;
  userPreference: IUserPreferenceEntityWithExtra;
}
