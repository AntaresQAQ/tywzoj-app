import * as React from "react";

import { IUserAtomicEntity } from "@/Common/ServerType/User";
import { useCurrentUser } from "@/Features/Environment/Hooks";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";

import { CE_Permission } from "../Enums/Permission";
import { CE_UserLevel } from "../Enums/UserLevel";
import { usePermission } from "./Permission";

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

export const useAllowedEditUser = (user: IUserAtomicEntity): boolean => {
    const allowedManageUser = usePermission(CE_Permission.ManageUser);
    const currentUser = useCurrentUser();

    if (allowedManageUser) {
        return true;
    }

    return !!currentUser && currentUser.id === user.id;
};
