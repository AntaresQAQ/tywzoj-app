import { CE_Permissions } from "../Enums/Permissions";
import { CE_UserLevel } from "../Enums/UserLevel";

export function checkIsAllowed(userLevel: CE_UserLevel, permissions: CE_Permissions) {
  return userLevel >= permissions;
}
