import { registerIcons } from "@fluentui/react";
import { SettingsIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerSettingsIcon = runOnce(() => {
    registerIcons({
        icons: {
            Settings: <SettingsIcon />,
        },
    });
    return "Settings";
});
