export interface IServerVersion {
  hash: string;
  date: string;
}

export interface ISecurityPreferenceConfig {
  recaptchaEnabled: boolean;
  recaptchaKey: string;
  requireEmailVerification: boolean;
}

export interface IPaginationPreferenceConfig {
  homepageNotice: number;
  homepageUserList: number;
  homepageContest: number;
  homepageHomework: number;
  problem: number;
  problemSet: number;
  submission: number;
  submissionStatistic: number;
  homework: number;
  contest: number;
  article: number;
  articleReply: number;
  userList: number;
}

export interface IMiscPreferenceConfig {
  gravatarCdn: string;
  sortUserBy: "id" | "rating" | "acceptedProblemCount";
  renderMarkdownInUserBio: boolean;
  renderMarkdownInUserListBio: boolean;
}

export interface IPreferenceConfig {
  siteName: string;
  domainIcpRecordInformation: string;
  security: ISecurityPreferenceConfig;
  pagination: IPaginationPreferenceConfig;
  misc: IMiscPreferenceConfig;
}
