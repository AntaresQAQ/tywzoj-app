import axios, { AxiosResponse } from "axios";

import { CE_ErrorCode } from "@/Common/Enums/ErrorCode";
import { XOR } from "@/Common/Utilities/Types";
import { getApiBearerToken, getApiEndPoint } from "@/Features/Environment/Selectors";
import { catchError } from "@/Features/Error/Action";
import { store } from "@/Features/Store";

export interface IRequestOptions<TQuery, TBody> {
    path: string;
    method: "GET" | "POST" | "PATCH" | "DELETE";
    query?: TQuery;
    body?: TBody;
    recaptchaToken?: string;
}

export interface IResponseError {
    code: CE_ErrorCode;
    msg?: string;
}

export type IResponseData<T> = XOR<{ data: T }, { error: IResponseError }>;

export async function requestAsync<TResponse, TQuery = undefined, TBody = undefined>(
    options: IRequestOptions<TQuery, TBody>,
    filteredErrors: CE_ErrorCode[] = [],
): Promise<IResponseData<TResponse>> {
    const appState = store.getState();
    const apiBearerToken = getApiBearerToken(appState);
    const apiEndPoint = getApiEndPoint(appState);
    let response: AxiosResponse;
    try {
        response = await axios.request({
            url: `${apiEndPoint}api/${options.path}`,
            method: options.method,
            params: options.query,
            data: options.body && JSON.stringify(options.body),
            headers: {
                "Content-Type": "application/json",
                Authorization: apiBearerToken && `Bearer ${apiBearerToken}`,
                ...(options.recaptchaToken && { "X-Recaptcha-Token": options.recaptchaToken }),
            },
            validateStatus: () => true,
        });
    } catch (e) {
        if (e instanceof Error) {
            store.dispatch(catchError(CE_ErrorCode.Unknown, e.message));
        } else {
            console.error(e);
            store.dispatch(catchError(CE_ErrorCode.Unknown));
        }
        return { error: { code: CE_ErrorCode.Unknown } };
    }

    if ([200, 201].includes(response.status)) {
        return {
            data:
                response.headers["content-type"]?.includes("application/json") && typeof response.data === "string"
                    ? JSON.parse(response.data)
                    : response.data,
        };
    }

    let error: IResponseError;

    if (response.headers["content-type"]?.includes("application/json") && typeof response.data === "string") {
        error = JSON.parse(response.data) as unknown as IResponseError;
    } else if (typeof response.data === "object") {
        error = response.data as unknown as IResponseError;
    } else {
        error = { msg: String(response.data) } as unknown as IResponseError;
    }

    if (!error.code) {
        switch (response.status) {
            case 401:
                error.code = CE_ErrorCode.AuthRequired;
                break;
            case 500:
                error.code = CE_ErrorCode.ServerError;
                break;
            default:
                error.code = CE_ErrorCode.Unknown;
                break;
        }
    }

    if (!filteredErrors.includes(error.code)) {
        store.dispatch(catchError(error.code, error.msg));
    }
    return { error };
}
