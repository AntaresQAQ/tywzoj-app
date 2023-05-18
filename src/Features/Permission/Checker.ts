import { CE_Permission } from "./Enums/Permission";
import { CE_UserLevel } from "./Enums/UserLevel";

export function checkIsAllowed(userLevel: CE_UserLevel, permission: CE_Permission) {
  return userLevel >= permission;
}
