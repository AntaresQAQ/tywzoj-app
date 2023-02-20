import { CE_ThemeName } from "@/Common/Theme";
import { IRootState } from "@/Features/Store";

export const getEnv = (state: IRootState) => state.env;
export const getApiBearerToken = (state: IRootState) => state.env.apiBearerToken;
export const getApiEndPoint = (state: IRootState) => state.env.apiEndPoint;
export const getIsRtl = (state: IRootState) => state.env.isRtl;
export const getIsSmallScreen = (state: IRootState) => state.env.isSmallScreen;
export const getIsMiniScreen = (state: IRootState) => state.env.isMiniScreen;
export const getIsMiddleScreen = (state: IRootState) => state.env.isMiddleScreen;
export const getIsMobile = (state: IRootState) => state.env.isMobile;
export const getIsMobileView = (state: IRootState) => state.env.isMobileView;
export const getPageName = (state: IRootState) => state.env.pageName;
export const getRecaptchaEnabled = (state: IRootState) => state.env.recaptchaEnabled;
export const getRecaptchaKey = (state: IRootState) => state.env.recaptchaKey;
export const getSiteName = (state: IRootState) => state.env.siteName;
export const getThemeName = (state: IRootState) => state.env.themeName;
export const getIsDarkMode = (state: IRootState) => state.env.themeName !== CE_ThemeName.Light;
export const getCurrentUser = (state: IRootState) => state.currentUser;
