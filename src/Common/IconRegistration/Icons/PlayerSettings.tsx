import { registerIcons } from "@fluentui/react";
import { PlayerSettingsIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerPlayerSettingsIcon = runOnce(() => {
  registerIcons({
    icons: {
      PlayerSettings: <PlayerSettingsIcon />,
    },
  });
  return "PlayerSettings";
});
