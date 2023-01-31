import { IPreferenceConfig, IServerVersion } from "./Common";
import { IUserBaseEntity } from "./User";

export interface ISessionInfo {
  userBaseDetail: IUserBaseEntity;
  serverVersion: IServerVersion;
  preference: IPreferenceConfig;
  unixTimestamp: number;
}
