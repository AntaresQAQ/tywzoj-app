import { registerIcons } from "@fluentui/react";
import { RedEyeIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerRedEyeIcon = runOnce(() => {
    registerIcons({
        icons: {
            RedEye: <RedEyeIcon />,
        },
    });
    return "RedEye";
});
