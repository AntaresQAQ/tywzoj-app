import { registerIcons } from "@fluentui/react";
import { AddFriendIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerAddFriendIcon = runOnce(() => {
    registerIcons({
        icons: {
            AddFriend: <AddFriendIcon />,
        },
    });
    return "AddFriend";
});
