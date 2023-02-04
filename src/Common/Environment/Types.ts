import {
  IMiscPreferenceConfig,
  IPaginationPreferenceConfig,
  ISecurityPreferenceConfig,
  IServerVersion,
} from "@/Common/ServerType/Common";
import { IUserBaseEntity } from "@/Common/ServerType/User";
import { CE_ThemeName } from "@/Common/Theme";

export interface IEnvState extends IMiscPreferenceConfig, ISecurityPreferenceConfig {
  apiBearerToken: string;
  apiEndPoint: string;
  domainIcpRecordInformation: string;
  isAndroid: boolean;
  isChrome: boolean;
  isEdge: boolean;
  isFirefox: boolean;
  isIOS: boolean;
  isMiddleScreen: boolean;
  isMiniScreen: boolean;
  isMobile: boolean;
  isRtl: boolean;
  isSafari: boolean;
  isSmallScreen: boolean;
  pageName: string;
  serverTimeDiff: number;
  siteName: string;
  themeName: CE_ThemeName;
}

export type IServerVersionState = IServerVersion;
export type IClientVersionState = IClientVersion;
export interface IVersionState {
  server: IServerVersionState;
  client: IClientVersionState;
}

export type IPaginationState = IPaginationPreferenceConfig;
export type ICurrentUserState = IUserBaseEntity;
