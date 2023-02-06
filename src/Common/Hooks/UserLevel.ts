import React from "react";

import { CE_UserLevel } from "@/Common/Enums/UserLevel";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";

export const useUserLevelText = () => {
  const ls = useLocalizedStrings();

  return React.useCallback(
    (level: CE_UserLevel) => {
      switch (level) {
        case CE_UserLevel.Admin:
          return ls.LS_COMMON_USER_LEVEL_ADMIN_NAME;
        case CE_UserLevel.Manager:
          return ls.LS_COMMON_USER_LEVEL_MANAGER_NAME;
        case CE_UserLevel.Internal:
          return ls.LS_COMMON_USER_LEVEL_INTERNAL_NAME;
        case CE_UserLevel.Paid:
          return ls.LS_COMMON_USER_LEVEL_PAID_NAME;
        case CE_UserLevel.Blocked:
          return ls.LS_COMMON_USER_LEVEL_BLOCKED_NAME;
        case CE_UserLevel.General:
        default:
          return ls.LS_COMMON_USER_LEVEL_GENERAL_NAME;
      }
    },
    [ls],
  );
};
