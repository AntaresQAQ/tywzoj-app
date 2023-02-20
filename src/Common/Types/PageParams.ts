import { CE_Page } from "@/Common/Enums/PagePath";

export type IParam = { [k: string]: string | number };

type IBasePageParams = { [k in CE_Page]: IParam };
export interface IPageParams extends IBasePageParams {
  [CE_Page.UserDetail]: {
    id: number;
  };
  [CE_Page.UserSetting]: IPageParams[CE_Page.UserDetail];
  [CE_Page.UserEdit]: IPageParams[CE_Page.UserDetail];
  [CE_Page.UsernameRedirect]: {
    username: string;
  };
}
