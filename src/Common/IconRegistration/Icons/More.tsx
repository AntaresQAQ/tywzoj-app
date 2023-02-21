import { registerIcons } from "@fluentui/react";
import { MoreIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerMoreIcon = runOnce(() => {
  registerIcons({
    icons: {
      More: <MoreIcon />,
    },
  });
  return "More";
});
