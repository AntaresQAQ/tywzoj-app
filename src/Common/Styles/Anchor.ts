import { ITheme } from "@fluentui/react";

export const commonAnchorStyle = {
  "a, a:link, a:visited, a:hover, a:active": {
    textDecoration: "none",
    color: "inherit",
  },
};

export const themedAnchorStyle = (theme: ITheme) => ({
  "a, a:link, a:visited, a:active": {
    textDecoration: "none",
    color: theme.palette.themePrimary,
  },
  "a:hover": {
    textDecoration: "underline",
    color: theme.palette.themeDark,
  },
});
