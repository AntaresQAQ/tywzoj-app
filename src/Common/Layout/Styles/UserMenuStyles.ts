import { ITheme, memoizeFunction, mergeStyleSets } from "@fluentui/react";

import { flex } from "@/Common/Styles/Flex";

export const getUserMenuStyles = memoizeFunction((theme: ITheme, isMobile: boolean) =>
  mergeStyleSets({
    root: {
      ...flex({
        alignItems: "center",
      }),
      marginRight: isMobile ? 10 : 20,
      height: "100%",
    },
  }),
);
