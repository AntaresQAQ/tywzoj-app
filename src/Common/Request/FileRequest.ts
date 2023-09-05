import axios, { AxiosProgressEvent } from "axios/index";

import { IFileUploadRequest } from "@/Common/ServerType/File";

export async function uploadFileToMinIORequestAsync(
    uploadRequest: IFileUploadRequest,
    file: Blob,
    cancelFunctionReceiver?: (cancelFunction: () => void) => void,
    onUploadProgress?: (e: AxiosProgressEvent) => void,
) {
    const cancelTokenSource = axios.CancelToken.source();
    let isCancelled = false;

    cancelFunctionReceiver &&
        cancelFunctionReceiver(() => {
            if (isCancelled) return;
            isCancelled = true;
            cancelTokenSource.cancel();
        });

    const formData = new FormData();
    Object.entries(uploadRequest.formData).forEach(([k, v]) => formData.append(k, v));
    formData.append(uploadRequest.uuid, file);
    await axios.post(uploadRequest.postUrl, formData, {
        onUploadProgress,
        cancelToken: cancelTokenSource.token,
    });
}
