export function getAppBuildEnv() {
  return import.meta.env;
}

export function getApiEndPoint() {
  let apiEndPoint = getAppBuildEnv().TYWZOJ_API_END_POINT;
  if (!apiEndPoint.endsWith("/")) apiEndPoint += "/";
  return apiEndPoint;
}

export function getAppLogoUrl(isDarkMode: boolean) {
  return isDarkMode ? getAppBuildEnv().TYWZOJ_DARK_LOGO_URL : getAppBuildEnv().TYWZOJ_LIGHT_LOGO_URL;
}

export function getBaseUrl() {
  let baseUrl = getAppBuildEnv().BASE_URL;
  if (!baseUrl.endsWith("/")) baseUrl += "/";
  return baseUrl;
}
