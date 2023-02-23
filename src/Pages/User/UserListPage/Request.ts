import { requestAsync } from "@/Common/Request/ApiRequest";

import { CE_SortBy, IGetUserListRequestQuery, IGetUserListResponse } from "./Types";

export async function getUserListRequestAsync(sortBy: CE_SortBy, skipCount: number, takeCount: number) {
  return await requestAsync<IGetUserListResponse, IGetUserListRequestQuery>({
    method: "GET",
    path: "user/list",
    query: {
      sortBy,
      skipCount,
      takeCount,
    },
  });
}
