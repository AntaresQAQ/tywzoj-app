import { registerIcons } from "@fluentui/react";
import { FolderHorizontalIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerFolderHorizontalIcon = runOnce(() => {
  registerIcons({
    icons: {
      FolderHorizontal: <FolderHorizontalIcon />,
    },
  });
  return "FolderHorizontal";
});
