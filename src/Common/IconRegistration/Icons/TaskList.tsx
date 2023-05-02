import { registerIcons } from "@fluentui/react";
import { TaskListIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerTaskListIcon = runOnce(() => {
  registerIcons({
    icons: {
      TaskList: <TaskListIcon />,
    },
  });
  return "TaskList";
});
