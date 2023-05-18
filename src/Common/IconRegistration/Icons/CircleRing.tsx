import { registerIcons } from "@fluentui/react";
import { CircleRingIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerCircleRingIcon = runOnce(() => {
  registerIcons({
    icons: {
      CircleRing: <CircleRingIcon />,
    },
  });
  return "CircleRing";
});
