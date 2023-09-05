import { registerIcons } from "@fluentui/react";
import { DownloadIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerDownloadIcon = runOnce(() => {
    registerIcons({
        icons: {
            Download: <DownloadIcon />,
        },
    });
    return "Download";
});
