import { requestAsync } from "@/Common/Request/ApiRequest";

import {
  IGetProblemDetailRequestQuery,
  IGetProblemDetailResponse,
  IGetProblemTagsRequestQuery,
  IGetProblemTagsResponse,
} from "./Types";

export async function getProblemDetailRequestAsync(displayId: string, queryTags?: boolean) {
  return await requestAsync<IGetProblemDetailResponse, IGetProblemDetailRequestQuery>({
    path: `problem/detailByDisplayId/${displayId}`,
    method: "GET",
    query: { queryTags },
  });
}

export async function getProblemTagsRequestAsync(problemId: number, queryType?: boolean) {
  return await requestAsync<IGetProblemTagsResponse, IGetProblemTagsRequestQuery>({
    path: `problem/detail/${problemId}/tags`,
    method: "GET",
    query: { queryType },
  });
}
