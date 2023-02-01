import axios, { AxiosResponse } from "axios";

import { getApiBearerToken, getApiEndPoint } from "@/Common/Environment/Selectors";
import { catchError } from "@/Common/Error/Action";
import { CE_ErrorCode } from "@/Common/Error/Code";
import { XOR } from "@/Common/Utilities/Types";
import { store } from "@/Store";

type IQueryType = { [k: string]: string | number | boolean };
type IBodyType = { [k: string]: unknown };

export interface IRequestOptions {
  path: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  query?: IQueryType;
  body?: IBodyType;
  recaptchaToken?: string;
}

export interface IResponseError {
  code: CE_ErrorCode;
  msg?: string;
  extra?: unknown;
}

export type IResponseData<T> = XOR<{ data: T }, { error: IResponseError }>;

export async function requestAsync<T>(
  options: IRequestOptions,
  errors: CE_ErrorCode[] = [],
): Promise<IResponseData<T>> {
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
    return null;
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
  try {
    if (response.headers["content-type"]?.includes("application/json") && typeof response.data === "string") {
      error = JSON.parse(response.data) as unknown as IResponseError;
    } else {
      error = response.data as unknown as IResponseError;
    }

    if (!error.code) error.code = CE_ErrorCode.Unknown;
  } catch (e) {
    error = { code: CE_ErrorCode.Unknown };
  }

  if (!errors.includes(error.code)) {
    store.dispatch(catchError(error.code, error.msg));
  }
  return { error };
}
