import { registerIcons } from "@fluentui/react";
import { ErrorBadgeIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerErrorBadgeIcon = runOnce(() => {
    registerIcons({
        icons: {
            ErrorBadge: <ErrorBadgeIcon />,
        },
    });
    return "ErrorBadge";
});
