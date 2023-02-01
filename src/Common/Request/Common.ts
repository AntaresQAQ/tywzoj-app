import { requestAsync } from "@/Common/Request/ApiRequest";
import { ISessionInfo } from "@/Common/ServerType/Auth";

export async function getSessionInfoRequestAsync(token?: string) {
  const { data } = await requestAsync<ISessionInfo>({
    path: "auth/sessionInfo",
    method: "GET",
    ...(token && { query: { token } }),
  });
  return data;
}

export async function postLogoutRequestAsync() {
  return await requestAsync({
    path: "auth/logout",
    method: "POST",
  });
}
