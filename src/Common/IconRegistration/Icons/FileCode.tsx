import { registerIcons } from "@fluentui/react";
import { FileCodeIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerFileCodeIcon = runOnce(() => {
    registerIcons({
        icons: {
            FileCode: <FileCodeIcon />,
        },
    });
    return "FileCode";
});
