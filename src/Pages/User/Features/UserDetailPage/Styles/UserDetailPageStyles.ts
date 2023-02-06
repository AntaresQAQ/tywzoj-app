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
  top: {
    ...flex({
      flexDirection: "column",
      alignItems: "flex-start",
    }),
    backgroundColor: theme.palette.white,
    boxShadow: theme.effects.elevation16,
    borderRadius: 6,
    width: 280,
    padding: 20,
    gap: 20,
  },
  topLeft: {
    ...flex({
      alignItems: "center",
      justifyContent: "center",
    }),
  },
  topRight: {
    ...flex({
      flexDirection: "column",
    }),
    gap: 5,
  },
  editButtonContainer: {
    ...flex({
      alignItems: "center",
      justifyContent: "center",
    }),
    width: "100%",
  },
  bottom: {
    backgroundColor: theme.palette.white,
    boxShadow: theme.effects.elevation16,
    borderRadius: 6,
    height: 200,
    flexGrow: 1,
  },
  avatar: {
    borderRadius: "6%",
  },
  unmLblRow: {
    ...flex({
      alignItems: "center",
    }),
    gap: 15,
  },
  username: {
    fontWeight: 600,
    fontSize: 22,
    wordBreak: "break-all",
  },
  nickname: {
    ...flex({}),
    color: theme.palette.neutralTertiary,
    wordBreak: "break-all",
    fontSize: 14,
    gap: 7,
    span: { wordBreak: "keep-all" },
  },
  email: {
    ...flex({}),
    color: theme.palette.neutralSecondary,
    gap: 7,
    span: { wordBreak: "keep-all" },
  },
  registrationTime: {
    color: theme.palette.neutralSecondary,
  },
  editButton: {
    width: "100%",
  },
}));

const getMiddleScreenStyles = memoizeFunction(() => ({
  mainContainer: {
    ...flex({
      flexDirection: "column",
      alignItems: "flex-start",
    }),
  },
  top: {
    ...flex({
      flexDirection: "row",
      alignItems: "center",
    }),
    boxSizing: "border-box",
    width: "100%",
  },
  topRight: {
    flexGrow: 1,
  },
  editButtonContainer: {
    ...flex({
      justifyContent: "center",
      alignItems: "center",
    }),
    width: "initial",
  },
  bottom: {
    width: "100%",
  },
  avatar: {
    height: 200,
    width: 200,
  },
  editButton: {
    fontSize: 24,
    height: 40,
    width: 40,
  },
}));

const getSmallScreenStyles = memoizeFunction((theme: ITheme, isMobileView: boolean) => ({
  top: {
    gap: 12,
  },
  middle: {
    ...flex({
      flexDirection: "column",
    }),
    backgroundColor: theme.palette.white,
    boxShadow: theme.effects.elevation16,
    borderRadius: 6,
    width: "100%",
    boxSizing: "border-box",
    padding: 20,
    gap: 5,
  },
  avatar: {
    height: isMobileView ? 80 : 120,
    width: isMobileView ? 80 : 120,
  },
  unmLblRow: {
    ...(isMobileView && {
      ...flex({
        flexDirection: "column",
        alignItems: "flex-start",
      }),
      gap: 5,
    }),
  },
  username: {
    fontSize: 20,
  },
  nickname: {
    ...(isMobileView && { color: theme.palette.neutralPrimary }),
  },
  email: {
    color: theme.palette.neutralPrimary,
  },
  registrationTime: {
    color: theme.palette.neutralPrimary,
  },
  editButton: {
    fontSize: 22,
    height: 36,
    width: 36,
  },
}));

export const getUserDetailPageStyles = memoizeFunction(
  (theme: ITheme, isMiddleScreen: boolean, isSmallScreen: boolean, isMobileView: boolean) =>
    mergeStyleSets(
      getBasicStyle(theme),
      isMiddleScreen && getMiddleScreenStyles(),
      isSmallScreen && getSmallScreenStyles(theme, isMobileView),
    ),
);
