import * as React from "react";

import { useCurrentUser } from "@/Features/Environment/Hooks";

import { checkIsAllowed } from "../Checker";
import { CE_Permission } from "../Enums/Permission";

export const usePermission = (permission: CE_Permission) => {
    const currentUser = useCurrentUser();

    return React.useMemo(
        () => (currentUser ? checkIsAllowed(currentUser.level, permission) : false),
        [currentUser, permission],
    );
};
