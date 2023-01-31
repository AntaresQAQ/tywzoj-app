import { ITheme, memoizeFunction, mergeStyleSets } from "@fluentui/react";

import { flex } from "@/Common/Styles/Flex";
import { CE_ZIndex } from "@/Common/Styles/ZIndex";

export const headerHeight = 50;
export const navBarWidth = 130;
export const getLayoutStyles = memoizeFunction((theme: ITheme, isMobile: boolean) =>
  mergeStyleSets(
    {
      root: {
        position: "relative",
        width: `calc(100% - ${navBarWidth}px)`,
        height: `calc(100% - ${headerHeight}px)`,
        top: headerHeight,
        left: navBarWidth,
        backgroundColor: theme.palette.white,
      },
      header: {
        ...flex({}),
        position: "fixed",
        zIndex: CE_ZIndex.AppHeader,
        top: 0,
        left: navBarWidth,
        height: headerHeight,
        width: `calc(100% - ${navBarWidth}px)`,
        backgroundColor: theme.palette.white,
        boxShadow: theme.effects.elevation4,
      },
      navbar: {
        ...flex({
          flexDirection: "column",
        }),
        position: "fixed",
        zIndex: CE_ZIndex.AppNavbar,
        top: 0,
        left: 0,
        height: "100%",
        width: navBarWidth,
        backgroundColor: theme.palette.white,
        boxShadow: theme.effects.elevation16,
      },
      navButtonContainer: {
        ...flex({
          alignItems: "center",
        }),
      },
      navButton: {
        height: headerHeight,
        width: 50,
        color: theme.palette.neutralPrimary,
      },
      navPanel: {
        ".ms-Panel-commands": {
          paddingTop: 0,
          marginBottom: 20,
          height: headerHeight,
          boxShadow: theme.effects.elevation4,
        },
        ".ms-Panel-navigation": {
          ...flex({
            flexDirection: "row-reverse",
          }),
        },
        ".ms-Panel-closeButton": {
          color: theme.palette.neutralPrimary,
          height: headerHeight,
          width: 50,
          ".ms-Button-icon": {
            fontSize: 20,
          },
          marginRight: 0,
        },
        ".ms-Panel-header": {
          ...flex({
            alignItems: "center",
          }),
          height: headerHeight,
        },
      },
      logo: {
        ...flex({
          alignItems: "center",
        }),
        height: headerHeight,
        overflow: "hidden",
        img: { width: navBarWidth },
      },
      userMenuContainer: {
        ...flex({
          flexDirection: "row-reverse",
        }),
        flexGrow: 2,
      },
      mainContainer: {
        ...flex({
          flexDirection: "column",
        }),
        height: "100%",
        width: "100%",
        overflow: "auto",
      },
      mainContent: {
        margin: 20,
      },
      spinner: {
        flexGrow: 1000,
      },
    },
    isMobile && {
      root: {
        left: 0,
        width: "100%",
      },
      header: {
        left: 0,
        width: "100%",
      },
      logo: {
        width: 150,
        img: { width: 150 },
      },
    },
  ),
);
