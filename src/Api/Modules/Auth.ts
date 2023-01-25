import { requestAsync } from "@/Api/Api";
import { ISessionInfo } from "@/Api/ServerType/Auth";

export async function getSessionInfoRequestAsync(token?: string) {
  return await requestAsync<ISessionInfo>({
    path: "auth/sessionInfo",
    method: "GET",
    ...(token && { query: { token } }),
  });
}
