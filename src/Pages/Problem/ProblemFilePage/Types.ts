import { IProblemEntityWithExtra } from "@/Common/ServerType/Problem";
import { IProblemFileEntityWithExtra } from "@/Common/ServerType/ProblemFile";

export interface IProblemFilePageState {
  testDataFiles: IProblemFileEntityWithExtra[];
  additionalFiles: IProblemFileEntityWithExtra[];
}

export interface IGetProblemDetailRequestQuery {
  queryTags?: boolean;
}

export type IGetProblemDetailResponse = IProblemEntityWithExtra;

export interface IGetProblemFilesResponse {
  files: IProblemFileEntityWithExtra[];
}
