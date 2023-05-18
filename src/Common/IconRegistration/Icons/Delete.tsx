import { registerIcons } from "@fluentui/react";
import { DeleteIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerDeleteIcon = runOnce(() => {
  registerIcons({
    icons: {
      Delete: <DeleteIcon />,
    },
  });
  return "Delete";
});
