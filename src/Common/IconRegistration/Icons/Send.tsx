import { registerIcons } from "@fluentui/react";
import { SendIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerSendIcon = runOnce(() => {
    registerIcons({
        icons: {
            Send: <SendIcon />,
        },
    });
    return "Send";
});
