/* eslint-disable @typescript-eslint/naming-convention */

interface IClientVersion {
    readonly hash: string;
    readonly date: string;
}

interface IBuildInfo {
    readonly clientVersion: IClientVersion;
}

interface Window {
    readonly appBuildInfo: IBuildInfo;
}
