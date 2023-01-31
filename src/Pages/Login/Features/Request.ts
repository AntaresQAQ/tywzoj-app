import { requestAsync } from "@/Common/Request/ApiRequest";
import { IPostLoginRequestBody, IPostLoginResponse } from "@/Pages/Login/Features/Types";

export async function postLoginRequestAsync(body: IPostLoginRequestBody, recaptchaToken: string) {
  return await requestAsync<IPostLoginResponse>({
    path: "auth/login",
    method: "POST",
    body,
    recaptchaToken,
  });
}
