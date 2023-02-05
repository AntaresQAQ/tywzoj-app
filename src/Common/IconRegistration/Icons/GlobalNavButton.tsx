import { registerIcons } from "@fluentui/react";
import { GlobalNavButtonIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerGlobalNavButtonIcon = runOnce(() => {
  registerIcons({
    icons: {
      GlobalNavButton: <GlobalNavButtonIcon />,
    },
  });
  return "GlobalNavButton";
});
