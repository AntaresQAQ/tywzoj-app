import { registerIcons } from "@fluentui/react";
import { CommentIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerCommentIcon = runOnce(() => {
    registerIcons({
        icons: {
            Comment: <CommentIcon />,
        },
    });
    return "Comment";
});
