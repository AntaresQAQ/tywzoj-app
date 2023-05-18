import { CE_UserLevel } from "./UserLevel";

// Please keep this enum the same as server side
export const enum CE_Permission {
  ManageSite = CE_UserLevel.Admin,
  ManageUser = CE_UserLevel.Admin,
  ManageProblem = CE_UserLevel.Manager,
  CreatePersonalProblem = CE_UserLevel.Paid,
  AccessProblem = CE_UserLevel.General,
  AccessGroup = CE_UserLevel.Internal,
  AccessHomework = CE_UserLevel.Internal,
  AccessSite = CE_UserLevel.General,
}
