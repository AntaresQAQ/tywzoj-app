import { IFileUploadRequest } from "@/Common/ServerType/File";
import { IProblemEntityWithExtra } from "@/Common/ServerType/Problem";
import { CE_ProblemFileType, IProblemFileEntityWithExtra } from "@/Common/ServerType/ProblemFile";

export interface IProblemFilePageState {
    testDataFiles: IProblemFileEntityWithExtra[];
    additionalFiles: IProblemFileEntityWithExtra[];
    testDataUploadTasks: IFileUploadTask[];
    additionalFileUploadTasks: IFileUploadTask[];
}

export const enum CE_UploadingState {
    WAITING,
    UPLOADING,
    FAILED,
    SUCCEED,
}

export interface IFileUploadTask {
    filename: string;
    state: CE_UploadingState;
    progress: number;
}

export interface IGetProblemDetailRequestQuery {
    queryTags?: boolean;
}

export type IGetProblemDetailResponse = IProblemEntityWithExtra;

export interface IGetProblemFilesResponse {
    files: IProblemFileEntityWithExtra[];
}

export interface IPostProblemFileUploadRequestRequestBody {
    problemId: string;
    filename: string;
    type: CE_ProblemFileType;
    size: number;
}

export interface IPostProblemFileUploadRequestResponse {
    readonly uploadRequest: IFileUploadRequest;
    readonly token: string;
}

export interface IPostProblemFileUploadedReportRequestBody {
    token: string;
    uuid: string;
}

export type IPostProblemFileUploadedReportResponse = IProblemFileEntityWithExtra;
