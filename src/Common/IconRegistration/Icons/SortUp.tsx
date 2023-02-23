import { registerIcons } from "@fluentui/react";
import { SortUpIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerSortUpIcon = runOnce(() => {
  registerIcons({
    icons: {
      SortUp: <SortUpIcon />,
    },
  });
  return "SortUp";
});
