import { registerIcons } from "@fluentui/react";
import { WarningIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerWarningIcon = runOnce(() => {
  registerIcons({
    icons: {
      Warning: <WarningIcon />,
    },
  });
  return "Warning";
});
