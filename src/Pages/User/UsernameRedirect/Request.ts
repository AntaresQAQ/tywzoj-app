import { requestAsync } from "@/Common/Request/ApiRequest";
import { IGetUserSearchRequestQuery, IGetUserSearchResponse } from "@/Pages/User/UsernameRedirect/Types";

export async function getUserSearchByUsernameRequestAsync(username: string): Promise<number> {
  return await requestAsync<IGetUserSearchResponse, IGetUserSearchRequestQuery>({
    path: "user/search",
    method: "GET",
    query: {
      key: username,
      strict: true,
    },
  }).then(({ data }) => data?.users?.[0]?.id);
}
