import { ITheme, memoizeFunction, mergeStyleSets } from "@fluentui/react";

import { flex } from "@/Common/Styles/Flex";

const getBasicStyle = memoizeFunction((theme: ITheme) => ({
  root: {
    ...flex({
      flexDirection: "row",
      justifyContent: "center",
    }),
    width: "100%",
  },
  mainContainer: {
    ...flex({
      flexDirection: "row",
      alignItems: "flex-start",
    }),
    gap: 20,
    maxWidth: 1000,
    width: "100%",
  },
  headerBox: {
    ...flex({
      flexDirection: "column",
    }),
    backgroundColor: theme.palette.white,
    boxShadow: theme.effects.elevation16,
    width: 250,
    borderRadius: 8,
  },
  avatarContainer: {},
  avatar: {
    margin: 20,
    borderRadius: "5%",
  },
  infoContainer: {},
  info: {
    ...flex({
      flexDirection: "column",
    }),
    margin: "0 20px 20px",
  },
  infoRow1: {
    ...flex({
      flexDirection: "row",
    }),
  },
  tabsBox: {
    backgroundColor: theme.palette.white,
    boxShadow: theme.effects.elevation16,
    height: 500,
    borderRadius: 8,
    flexGrow: 1,
  },
}));

const getMiddleScreenStyles = memoizeFunction((theme: ITheme, isSmallScreen: boolean) => ({
  mainContainer: {
    ...flex({
      flexDirection: "column",
    }),
  },
  headerBox: {
    ...flex({
      flexDirection: "row",
    }),
    width: "100%",
    height: "initial",
    backgroundColor: "",
    boxShadow: "initial",
    gap: 15,
  },
  avatarContainer: {
    backgroundColor: theme.palette.white,
    boxShadow: theme.effects.elevation16,
    width: isSmallScreen ? 130 : 200,
    height: isSmallScreen ? 130 : 200,
    borderRadius: 8,
  },
  avatar: {
    margin: isSmallScreen ? 10 : 15,
  },
  infoContainer: {
    backgroundColor: theme.palette.white,
    boxShadow: theme.effects.elevation16,
    height: isSmallScreen ? 130 : 200,
    borderRadius: 8,
    flexGrow: 1,
    margin: 0,
  },
  info: {
    margin: 10,
  },
  tabsBox: {
    width: "100%",
    flexGrow: "initial",
  },
}));

export const getUserDetailPageStyles = memoizeFunction(
  (theme: ITheme, isMiddleScreen: boolean, isSmallScreen: boolean) =>
    mergeStyleSets(getBasicStyle(theme), isMiddleScreen && getMiddleScreenStyles(theme, isSmallScreen)),
);
