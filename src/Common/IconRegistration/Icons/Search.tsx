import { registerIcons } from "@fluentui/react";
import { SearchIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerSearchIcon = runOnce(() => {
  registerIcons({
    icons: {
      Search: <SearchIcon />,
    },
  });
  return "Search";
});
