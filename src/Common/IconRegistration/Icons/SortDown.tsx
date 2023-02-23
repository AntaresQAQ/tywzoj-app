import { registerIcons } from "@fluentui/react";
import { SortDownIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerSortDownIcon = runOnce(() => {
  registerIcons({
    icons: {
      SortDown: <SortDownIcon />,
    },
  });
  return "SortDown";
});
