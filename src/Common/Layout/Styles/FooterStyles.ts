import { ITheme, memoizeFunction, mergeStyleSets } from "@fluentui/react";

import { flex } from "@/Common/Styles/Flex";

export const getFooterStyles = memoizeFunction((theme: ITheme) =>
  mergeStyleSets({
    root: {
      ...flex({
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }),
      gap: 5,
      padding: "20px",
      color: theme.palette.neutralTertiary,
    },
    declaration: {
      ...flex({}),
      fontWeight: 600,
    },
    version: {
      ...flex({}),
      fontSize: 12,
      fontWeight: 600,
      gap: 8,
      span: {
        fontWeight: 400,
      },
    },
    time: {
      ...flex({}),
      fontSize: 12,
    },
  }),
);
