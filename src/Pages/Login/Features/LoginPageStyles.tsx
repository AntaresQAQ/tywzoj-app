import { ITheme, memoizeFunction, mergeStyleSets } from "@fluentui/react";

import { flex } from "@/Common/Styles/Flex";

export const getLoginPageStyles = memoizeFunction((theme: ITheme) =>
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
      maxWidth: 400,
      minWidth: 200,
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
    typeChoice: {
      ".ms-ChoiceFieldGroup-flexContainer": {
        ...flex({}),
        gap: 30,
      },
    },
    button: {
      marginTop: 15,
    },
    footer: {
      ...flex({
        justifyContent: "center",
      }),
      gap: 30,
      margin: 25,
    },
  }),
);
