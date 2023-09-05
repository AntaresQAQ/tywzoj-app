import { IUserBaseEntityWithExtra } from "@/Common/ServerType/User";
import { IUserPreferenceEntityWithExtra } from "@/Common/ServerType/UserPreference";
import { CE_Language } from "@/Features/LocalizedString/Locales";

export interface IRegisterPageState {
    username: string;
    email: string;
    password: string;
    secondaryPassword: string;
    code: string;
    uError: string;
    eError: string;
    pError: string;
    spError: string;
    cError: string;
    sError: string;
    loading: boolean;
    sendCodeTime: number;
}

export interface IPostRegisterRequestBody {
    username: string;
    email: string;
    password: string;
    emailVerificationCode?: string;
}

export interface IPostRegisterResponse {
    token: string;
    userBaseDetail: IUserBaseEntityWithExtra;
    userPreference: IUserPreferenceEntityWithExtra;
}

export interface IGetCheckUsernameRequestQuery {
    username: string;
}

export interface IGetCheckUsernameResponse {
    available: boolean;
}

export interface IPostSendEmailVerificationCodeRequestBody {
    email: string;
    lang: CE_Language;
}
