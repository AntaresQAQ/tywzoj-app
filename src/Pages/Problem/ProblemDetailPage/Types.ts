import { IProblemEntityWithExtra } from "@/Common/ServerType/Problem";
import { IProblemTagEntityWithExtra } from "@/Common/ServerType/ProblemTag";

export interface IProblemDetailPageState {
  problemDetail: IProblemEntityWithExtra;
  showTags: boolean;
}

export interface IGetProblemDetailRequestQuery {
  queryTags?: boolean;
}

export type IGetProblemDetailResponse = IProblemEntityWithExtra;

export interface IGetProblemTagListRequestQuery {
  problemId: number;
  queryType?: boolean;
}

export interface IGetProblemTagListResponse {
  tags: IProblemTagEntityWithExtra[];
}
