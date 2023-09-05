import { IUserPreferenceEntityWithExtra } from "@/Common/ServerType/UserPreference";

import { IPreferenceConfig, IServerVersion } from "./Common";
import { IUserBaseEntityWithExtra } from "./User";

export interface ISessionInfo {
    userBaseDetail?: IUserBaseEntityWithExtra;
    userPreference?: IUserPreferenceEntityWithExtra;
    serverVersion: IServerVersion;
    preference: IPreferenceConfig;
    unixTimestamp: number;
}
