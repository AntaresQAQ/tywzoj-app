import { registerIcons } from "@fluentui/react";
import { SignOutIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerSignOutIcon = runOnce(() => {
  registerIcons({
    icons: {
      SignOut: <SignOutIcon />,
    },
  });
  return "SignOut";
});
