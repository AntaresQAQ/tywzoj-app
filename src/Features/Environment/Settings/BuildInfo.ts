export function getAppBuildInfo() {
    return window.appBuildInfo;
}

export function getClientVersion() {
    return getAppBuildInfo().clientVersion;
}
