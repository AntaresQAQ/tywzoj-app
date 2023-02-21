import { registerIcons } from "@fluentui/react";
import { ChevronRightIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerChevronRightIcon = runOnce(() => {
  registerIcons({
    icons: {
      ChevronRight: <ChevronRightIcon />,
    },
  });
  return "ChevronRight";
});
