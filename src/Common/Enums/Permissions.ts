import { CE_UserLevel } from "./UserLevel";

export const enum CE_Permissions {
  ManageSite = CE_UserLevel.Admin,
  ManageUser = CE_UserLevel.Admin,
  ManageProblem = CE_UserLevel.Manager,
  AccessHomework = CE_UserLevel.Internal,
  AccessSite = CE_UserLevel.General,
}
