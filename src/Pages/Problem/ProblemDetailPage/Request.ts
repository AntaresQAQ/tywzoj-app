import { requestAsync } from "@/Common/Request/ApiRequest";

import {
  IGetProblemDetailRequestQuery,
  IGetProblemDetailResponse,
  IGetProblemTagListRequestQuery,
  IGetProblemTagListResponse,
} from "./Types";

export async function getProblemDetailRequestAsync(displayId: string, queryTags?: boolean) {
  return await requestAsync<IGetProblemDetailResponse, IGetProblemDetailRequestQuery>({
    path: `problem/detailByDisplayId/${displayId}`,
    method: "GET",
    query: { queryTags },
  });
}

export async function getProblemTagListRequestAsync(problemId: number, queryType?: boolean) {
  return await requestAsync<IGetProblemTagListResponse, IGetProblemTagListRequestQuery>({
    path: `problem/detail/${problemId}/tags`,
    method: "GET",
    query: { queryType },
  });
}
