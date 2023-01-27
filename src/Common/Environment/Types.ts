import { IPaginationPreferenceConfig, IServerVersion } from "@/Api/ServerType/Common";
import { IUserBaseEntity } from "@/Api/ServerType/User";
import { CE_ThemeName } from "@/Common/Theme";

export interface IEnvState {
  apiBearerToken: string;
  apiEndPoint: string;
  domainIcpRecordInformation: string;
  gravatarCdn: string;
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
  recaptchaEnabled: boolean;
  recaptchaKey: string;
  renderMarkdownInUserBio: boolean;
  renderMarkdownInUserListBio: boolean;
  requireEmailVerification: boolean;
  siteName: string;
  sortUserBy: "id" | "rating" | "acceptedProblemCount";
  themeName: CE_ThemeName;
}

export type IServerVersionState = IServerVersion;
export type IPaginationState = IPaginationPreferenceConfig;
export type ICurrentUserState = IUserBaseEntity;
