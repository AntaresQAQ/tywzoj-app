import { ITheme, memoizeFunction, mergeStyleSets } from "@fluentui/react";

import { commonAnchorStyle } from "@/Common/Styles/Anchor";
import { flex } from "@/Common/Styles/Flex";

export const getUserMenuStyles = memoizeFunction((theme: ITheme, isMobile: boolean) =>
  mergeStyleSets({
    root: {
      ...flex({
        alignItems: "center",
      }),
      ...commonAnchorStyle,
      marginRight: isMobile ? 10 : 20,
      height: "100%",
    },
    icon: {
      fontSize: 16,
      margin: "0px 4px",
      height: 16,
      lineHeight: 16,
      textAlign: "center",
      flexShrink: 0,
      color: theme.palette.themePrimary,
    },
  }),
);
