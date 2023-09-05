import { registerIcons } from "@fluentui/react";
import { UploadIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerUploadIcon = runOnce(() => {
    registerIcons({
        icons: {
            Upload: <UploadIcon />,
        },
    });
    return "Upload";
});
