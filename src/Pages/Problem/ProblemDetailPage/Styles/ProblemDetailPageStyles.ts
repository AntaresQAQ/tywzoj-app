import { ITheme, memoizeFunction, mergeStyleSets } from "@fluentui/react";

import { flex } from "@/Common/Styles/Flex";

const getBasicStyles = memoizeFunction((theme: ITheme) => ({
  root: {
    ...flex({
      flexDirection: "row",
      justifyContent: "center",
    }),
    width: "100%",
  },
  container: {
    ...flex({
      flexDirection: "column",
    }),
    width: "100%",
    maxWidth: 1000,
  },
  header: {
    ...flex({
      alignItems: "flex-end",
    }),
    h1: {
      margin: 0,
    },
    margin: "20px 0 10px",
    gap: 20,
  },
  body: {
    ...flex({}),
    gap: 20,
  },
  bodyLeft: {
    ...flex({
      flexDirection: "column",
    }),
    boxSizing: "border-box",
    width: "calc(100% - 300px)",
    gap: 20,
  },
  bodyRight: {
    ...flex({
      flexDirection: "column",
    }),
    minWidth: 280,
    gap: 20,
  },
  boxContainer: {
    ...flex({
      flexDirection: "column",
    }),
    boxShadow: theme.effects.elevation8,
    boxSizing: "border-box",
    width: "100%",
    padding: 20,
    borderRadius: 4,
  },
  boxTitle: {
    margin: 0,
  },
  boxTitleWithSwitch: {
    ...flex({ justifyContent: "space-between" }),
    boxSizing: "border-box",
    width: "100%",
  },
  showTagsSwitch: {
    ...flex({
      flexDirection: "row-reverse",
      alignItems: "center",
    }),
    margin: 0,
    ".ms-Toggle-label": {
      marginLeft: 0,
      marginRight: 8,
    },
  },
  tagsContainer: {
    ...flex({ flexWrap: "wrap" }),
    gap: 8,
  },
  infoContainer: {
    ...flex({ flexDirection: "column" }),
    gap: 2,
    whiteSpace: "nowrap",
    wordBreak: "keep-all",
    span: {
      fontWeight: 600,
    },
  },
}));

export const middleScreenStyles = {
  bodyLeft: {
    width: "calc(100% - 240px)",
  },
  bodyRight: {
    minWidth: 220,
  },
};

export const smallScreenStyles = {
  body: {
    ...flex({ flexDirection: "column" }),
  },
  bodyLeft: {
    width: "100%",
  },
  bodyRight: {
    width: "100%",
  },
};

export const getProblemDetailPageStyles = memoizeFunction((theme: ITheme, isMiddleScreen, isSmallScreen: boolean) =>
  mergeStyleSets(getBasicStyles(theme), isMiddleScreen && middleScreenStyles, isSmallScreen && smallScreenStyles),
);
