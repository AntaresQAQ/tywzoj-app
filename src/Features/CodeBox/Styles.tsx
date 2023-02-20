import { ITheme, memoizeFunction, mergeStyles } from "@fluentui/react";

export const getCodeBoxStyle = memoizeFunction((theme: ITheme) =>
  mergeStyles({
    margin: 10,
    pre: {
      boxShadow: theme.effects.elevation16,
      borderRadius: theme.effects.roundedCorner4,
      border: `1px solid ${theme.palette.neutralLighterAlt}`,
    },
  }),
);
