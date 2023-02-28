import { CE_ErrorCode } from "@/Common/Enums/ErrorCode";
import { requestAsync } from "@/Common/Request/ApiRequest";
import { CE_Language } from "@/Features/LocalizedString/Locales";

import {
  IGetCheckUsernameRequestQuery,
  IGetCheckUsernameResponse,
  IPostRegisterRequestBody,
  IPostRegisterResponse,
  IPostSendEmailVerificationCodeRequestBody,
} from "./Types";

export async function postRegisterRequestAsync(body: IPostRegisterRequestBody, recaptchaToken: string) {
  return await requestAsync<IPostRegisterResponse, undefined, IPostRegisterRequestBody>(
    {
      method: "POST",
      path: "auth/register",
      body,
      recaptchaToken,
    },
    [
      CE_ErrorCode.Auth_DuplicateUsername,
      CE_ErrorCode.Auth_DuplicateEmail,
      CE_ErrorCode.Auth_InvalidEmailVerificationCode,
    ],
  );
}

export async function getCheckUsernameRequestAsync(username: string, recaptchaToken: string) {
  return await requestAsync<IGetCheckUsernameResponse, IGetCheckUsernameRequestQuery>({
    method: "GET",
    path: "auth/checkUsername",
    query: { username },
    recaptchaToken,
  });
}

export async function postSendRegisterEmailVerificationCodeRequestAsync(
  email: string,
  lang: CE_Language,
  recaptchaToken: string,
) {
  return await requestAsync<null, undefined, IPostSendEmailVerificationCodeRequestBody>(
    {
      method: "POST",
      path: "auth/sendRegisterEmailVerificationCode",
      body: { email, lang },
      recaptchaToken,
    },
    [CE_ErrorCode.Auth_DuplicateEmail, CE_ErrorCode.Auth_EmailVerificationCodeRateLimited],
  );
}
