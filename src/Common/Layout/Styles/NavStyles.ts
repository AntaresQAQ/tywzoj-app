import { ITheme, memoizeFunction, mergeStyleSets } from "@fluentui/react";

import { flex } from "@/Common/Styles/Flex";

export const getNavStyles = memoizeFunction((theme: ITheme) =>
  mergeStyleSets({
    navList: {
      ...flex({
        flexDirection: "column",
      }),
      color: theme.palette.neutralPrimary,
      ".active": {
        backgroundColor: theme.palette.neutralLight,
      },
    },
    navItem: {
      ...flex({
        alignItems: "center",
      }),
      height: 50,
      padding: "0 10px",
      ":hover": {
        backgroundColor: theme.palette.neutralLighter,
      },
    },
    navIcon: {
      maxWidth: 20,
      maxHeight: 20,
      overflow: "hidden",
      fontSize: 20,
      marginRight: 8,
    },
  }),
);
