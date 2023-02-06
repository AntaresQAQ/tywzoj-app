import { registerIcons } from "@fluentui/react";
import { HideIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerHideIcon = runOnce(() => {
  registerIcons({
    icons: {
      Hide: <HideIcon />,
    },
  });
  return "Hide";
});
