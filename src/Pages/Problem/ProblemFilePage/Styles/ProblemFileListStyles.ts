import { ITheme, memoizeFunction, mergeStyleSets } from "@fluentui/react";

import { flex } from "@/Common/Styles/Flex";

export const getProblemFileListStyles = memoizeFunction((theme: ITheme) =>
  mergeStyleSets({
    emptyBox: {
      ...flex({
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }),
      marginTop: 20,
      height: 140,
      gap: 20,
      backgroundColor: theme.palette.neutralLight,
      borderRadius: theme.effects.roundedCorner4,
    },
    emptyTextHint: {
      fontSize: 20,
      fontWeight: 600,
    },
    footerText: {
      marginTop: 10,
    },
    buttons: {
      ...flex({}),
      marginTop: 10,
    },
  }),
);
