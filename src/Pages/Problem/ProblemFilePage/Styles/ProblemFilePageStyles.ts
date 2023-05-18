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
    ...flex({}),
    marginBottom: 30,
  },
  body: {
    ...flex({
      justifyContent: "space-between",
      alignItems: "flex-start",
    }),
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
    h2: {
      margin: 0,
    },
  },
}));

const middleScreenStyles = {
  body: {
    ...flex({ flexDirection: "column" }),
  },
};

export const getProblemFilePageStyle = memoizeFunction((theme: ITheme, isMiddleScreen) =>
  mergeStyleSets(getBasicStyles(theme), isMiddleScreen && middleScreenStyles),
);
