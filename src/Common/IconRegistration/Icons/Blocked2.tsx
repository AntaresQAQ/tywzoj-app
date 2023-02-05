import { registerIcons } from "@fluentui/react";
import { Blocked2Icon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerBlocked2Icon = runOnce(() => {
  registerIcons({
    icons: {
      Blocked2: <Blocked2Icon />,
    },
  });
  return "Blocked2";
});
