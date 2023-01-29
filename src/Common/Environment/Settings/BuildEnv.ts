export function getAppBuildEnv() {
  return import.meta.env;
}

export function getApiEndPoint() {
  let apiEndPoint = getAppBuildEnv().TYWZOJ_API_END_POINT;
  if (!apiEndPoint.endsWith("/")) apiEndPoint += "/";
  return apiEndPoint;
}
