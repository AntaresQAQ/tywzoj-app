import { registerIcons } from "@fluentui/react";
import { StatusCircleCheckmarkIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerStatusCircleCheckmarkIcon = runOnce(() => {
  registerIcons({
    icons: {
      StatusCircleCheckmark: <StatusCircleCheckmarkIcon />,
    },
  });
  return "StatusCircleCheckmark";
});
