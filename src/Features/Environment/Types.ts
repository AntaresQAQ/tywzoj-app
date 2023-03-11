import {
  IMiscPreferenceConfig,
  IPaginationPreferenceConfig,
  ISecurityPreferenceConfig,
  IServerVersion,
} from "@/Common/ServerType/Common";
import { IUserBaseEntityWithExtra } from "@/Common/ServerType/User";
import { IUserPreferenceEntityWithExtra } from "@/Common/ServerType/UserPreference";
import { CE_ThemeName } from "@/Common/Theme";

export interface IEnvState extends IMiscPreferenceConfig, ISecurityPreferenceConfig, IUserPreferenceEntityWithExtra {
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
  isMobileView: boolean;
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
export type ICurrentUserState = IUserBaseEntityWithExtra;
