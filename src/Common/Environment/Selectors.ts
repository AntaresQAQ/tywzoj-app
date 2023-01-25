import { IRootState } from "@/Store";

export const getEnv = (state: IRootState) => state.env;
export const getApiBearerToken = (state: IRootState) => state.env.apiBearerToken;
export const getApiEndPoint = (state: IRootState) => state.env.apiEndPoint;
export const getRecaptchaKey = (state: IRootState) => state.env.recaptchaKey;
export const getSiteName = (state: IRootState) => state.env.siteName;
export const getThemeName = (state: IRootState) => state.env.themeName;
