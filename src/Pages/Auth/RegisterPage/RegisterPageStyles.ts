import { ITheme, memoizeFunction, mergeStyleSets } from "@fluentui/react";

import { themedAnchorStyle } from "@/Common/Styles/Anchor";
import { flex } from "@/Common/Styles/Flex";

export const getRegisterPageStyles = memoizeFunction((theme: ITheme) =>
  mergeStyleSets({
    root: {
      ...flex({
        justifyContent: "center",
        alignItems: "center",
      }),
      width: "100%",
    },
    container: {
      width: "100%",
      maxWidth: 420,
      backgroundColor: theme.palette.white,
      borderRadius: 6,
      border: `solid 1px ${theme.palette.neutralLight}`,
      boxShadow: theme.effects.elevation8,
    },
    title: {
      ...flex({
        justifyContent: "center",
      }),
    },
    fields: {
      ...flex({
        flexDirection: "column",
      }),
      gap: 15,
      padding: "0 20px",
    },
    inlineFields: {
      ...flex({
        flexDirection: "row",
      }),
      gap: 15,
    },
    codeField: {
      flexGrow: 1,
    },
    sendCodeButton: {
      marginTop: 30,
      minWidth: 120,
    },
    registerButton: {
      marginTop: 15,
    },
    footer: {
      ...flex({
        justifyContent: "center",
      }),
      gap: 7,
      margin: "25px 0",
    },
    recaptcha: {
      color: theme.palette.neutralTertiary,
      marginBottom: 25,
      padding: "0 20px",
      fontSize: 12,
      ...themedAnchorStyle(theme),
    },
    sendCodeError: {
      padding: "10px 15px",
      backgroundColor: theme.palette.white,
      color: theme.palette.redDark,
    },
  }),
);
