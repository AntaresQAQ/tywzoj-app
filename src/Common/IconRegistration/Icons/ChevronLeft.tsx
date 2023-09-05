import { registerIcons } from "@fluentui/react";
import { ChevronLeftIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerChevronLeftIcon = runOnce(() => {
    registerIcons({
        icons: {
            ChevronLeft: <ChevronLeftIcon />,
        },
    });
    return "ChevronLeft";
});
