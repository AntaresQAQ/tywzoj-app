import axios, { AxiosResponse } from "axios";

import { getApiBearerToken, getApiEndPoint } from "@/Common/Environment/Selectors";
import { CE_ErrorCode } from "@/Common/Error/Code";
import { AppException } from "@/Common/Error/Exception";
import { getState } from "@/Store";

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
}

export async function requestAsync<T>(options: IRequestOptions): Promise<T> {
  const appState = getState();
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
    if (e instanceof Error) throw new AppException(CE_ErrorCode.Unknow, e.message);
    console.error(e);
    throw new AppException(CE_ErrorCode.Unknow);
  }

  if ([200, 201].includes(response.status)) {
    return (typeof response.data === "string" ? JSON.parse(response.data) : response.data) as unknown as T;
  }

  let error: IResponseError;
  try {
    if (typeof response.data === "string") {
      error = JSON.parse(response.data) as unknown as IResponseError;
    } else {
      error = response.data as unknown as IResponseError;
    }
    if (!error.code) error.code = CE_ErrorCode.Unknow;
  } catch (e) {
    error = { code: CE_ErrorCode.Unknow };
  }

  if (response.status === 401 && error.code === CE_ErrorCode.AuthRequired) {
    // TODO: goto login page
  }

  throw new AppException(error.code, error.msg);
}
