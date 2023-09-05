import { requestAsync } from "@/Common/Request/ApiRequest";

import {
    IGetProblemDetailRequestQuery,
    IGetProblemDetailResponse,
    IGetProblemFilesResponse,
    IPostProblemFileUploadedReportRequestBody,
    IPostProblemFileUploadedReportResponse,
    IPostProblemFileUploadRequestRequestBody,
    IPostProblemFileUploadRequestResponse,
} from "./Types";

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

export async function postProblemFileUploadRequestRequestAsync(body: IPostProblemFileUploadRequestRequestBody) {
    return await requestAsync<
        IPostProblemFileUploadRequestResponse,
        undefined,
        IPostProblemFileUploadRequestRequestBody
    >({
        path: "file/uploadRequest",
        method: "POST",
        body,
    });
}

export async function postProblemFileUploadedReportRequestAsync(token: string, uuid: string) {
    return await requestAsync<
        IPostProblemFileUploadedReportResponse,
        undefined,
        IPostProblemFileUploadedReportRequestBody
    >({
        path: "file/uploadedReport",
        method: "POST",
        body: { token, uuid },
    });
}
