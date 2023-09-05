import { registerIcons } from "@fluentui/react";
import { PageIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerPageIcon = runOnce(() => {
    registerIcons({
        icons: {
            Page: <PageIcon />,
        },
    });
    return "Page";
});
