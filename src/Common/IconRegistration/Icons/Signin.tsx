import { registerIcons } from "@fluentui/react";
import { SigninIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerSigninIcon = runOnce(() => {
    registerIcons({
        icons: {
            Signin: <SigninIcon />,
        },
    });
    return "Signin";
});
