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

export interface IGetProblemTagsRequestQuery {
    queryType?: boolean;
}

export interface IGetProblemTagsResponse {
    tags: IProblemTagEntityWithExtra[];
}
