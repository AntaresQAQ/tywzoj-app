import { registerIcons } from "@fluentui/react";
import { ContactInfoIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";

export const registerContactInfoIcon = runOnce(() => {
  registerIcons({
    icons: {
      ContactInfo: <ContactInfoIcon />,
    },
  });
  return "ContactInfo";
});
