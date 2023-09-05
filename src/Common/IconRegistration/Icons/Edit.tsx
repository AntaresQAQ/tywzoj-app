import { registerIcons } from "@fluentui/react";
import { EditIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerEditIcon = runOnce(() => {
    registerIcons({
        icons: {
            Edit: <EditIcon />,
        },
    });
    return "Edit";
});
