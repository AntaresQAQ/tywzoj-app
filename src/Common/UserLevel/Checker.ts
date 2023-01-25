import { CE_Permissions } from "./Permissions";
import { CE_UserLevel } from "./UserLevel";

export function checkIsAllowed(userLevel: CE_UserLevel, permissions: CE_Permissions) {
  return userLevel >= permissions;
}
