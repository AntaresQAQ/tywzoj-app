import { CE_Page } from "@/Common/Enums/PagePath";

export type IParam = { [k: string]: string | number };

type IBasePageParams = { [k in CE_Page]: IParam };
export interface IPageParams extends IBasePageParams {
  // Problem
  [CE_Page.ProblemDetail]: {
    displayId: number;
  };
  [CE_Page.ProblemEdit]: {
    id: number;
  };
  [CE_Page.ProblemManage]: IPageParams[CE_Page.ProblemEdit];
  [CE_Page.ProblemData]: IPageParams[CE_Page.ProblemEdit];

  // Contest
  [CE_Page.ContestDetail]: {
    id: number;
  };
  [CE_Page.ContestProblem]: {
    // Contest id
    id: number;
    // Problem id
    pid: number;
  };

  // User
  [CE_Page.UserDetail]: {
    id: number;
  };
  [CE_Page.UserSetting]: IPageParams[CE_Page.UserDetail];
  [CE_Page.UserEdit]: IPageParams[CE_Page.UserDetail];
  [CE_Page.UsernameRedirect]: {
    username: string;
  };
}
