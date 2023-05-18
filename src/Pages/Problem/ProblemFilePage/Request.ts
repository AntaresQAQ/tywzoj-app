import { requestAsync } from "@/Common/Request/ApiRequest";

import { IGetProblemDetailRequestQuery, IGetProblemDetailResponse, IGetProblemFilesResponse } from "./Types";

export async function getProblemDetailRequestAsync(id: string) {
  return await requestAsync<IGetProblemDetailResponse, IGetProblemDetailRequestQuery>({
    path: `problem/detail/${id}`,
    method: "GET",
    query: { queryTags: false },
  });
}

export async function getProblemFilesRequestAsync(id: string) {
  return await requestAsync<IGetProblemFilesResponse>({
    path: `problem/detail/${id}/files`,
    method: "GET",
  });
}
