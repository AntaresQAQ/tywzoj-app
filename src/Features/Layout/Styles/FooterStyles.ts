import { ITheme, memoizeFunction, mergeStyleSets } from "@fluentui/react";

import { themedAnchorStyle } from "@/Common/Styles/Anchor";
import { flex } from "@/Common/Styles/Flex";

export const getFooterStyles = memoizeFunction((theme: ITheme) =>
  mergeStyleSets({
    root: {
      ...flex({
        flexDirection: "column",
        alignItems: "center",
      }),
      gap: 5,
      padding: "20px 0 40px",
      color: theme.palette.neutralTertiary,
    },
    declaration: {
      ...flex({}),
      ...themedAnchorStyle(theme),
      fontWeight: 600,
      marginBottom: 3,
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
    domainIcpRecord: {
      ...themedAnchorStyle(theme),
      fontSize: 12,
    },
    recaptcha: {
      ...themedAnchorStyle(theme),
      fontSize: 12,
    },
  }),
);
