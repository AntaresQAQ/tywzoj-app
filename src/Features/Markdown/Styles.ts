import { ITheme, memoizeFunction, mergeStyles } from "@fluentui/react";

import { themedAnchorStyle } from "@/Common/Styles/Anchor";

export const getMarkdownContentStyles = memoizeFunction((theme: ITheme) =>
  mergeStyles({
    position: "relative",
    overflow: "hidden",
    transform: "translate3d(0, 0, 0)",

    ...themedAnchorStyle(theme),

    "p, blockquote": {
      overflow: "auto",
      overflowY: "hidden",
    },

    blockquote: {
      color: theme.palette.neutralPrimaryAlt,
      backgroundColor: theme.palette.neutralLighter,
      paddingLeft: "1em",
      borderLeft: `0.25em solid ${theme.palette.neutralTertiaryAlt}`,
      margin: "1em 0",
    },

    "ul, ol, blockquote": {
      "&:first-child": {
        marginTop: "0 !important",
      },

      "&:last-child": {
        marginBottom: "0 !important",
      },
    },

    "p > img:only-child": {
      display: "block",
      margin: "0 auto",
      maxWidth: "100%",
    },

    "ul, ol": {
      paddingLeft: "2em",
      "ul, ol": {
        paddingLeft: "1.5em",
      },
    },
  }),
);
