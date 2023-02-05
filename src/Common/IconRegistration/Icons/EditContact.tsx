import { registerIcons } from "@fluentui/react";
import { EditContactIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerEditContactIcon = runOnce(() => {
  registerIcons({
    icons: {
      EditContact: <EditContactIcon />,
    },
  });
  return "EditContact";
});
