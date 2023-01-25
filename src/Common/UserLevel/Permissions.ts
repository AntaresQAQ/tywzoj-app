import { CE_UserLevel } from "./UserLevel";

export const enum CE_Permissions {
  ManageUser = CE_UserLevel.Admin,
  ManageProblem = CE_UserLevel.Manager,
  AccessSite = CE_UserLevel.General,
}
