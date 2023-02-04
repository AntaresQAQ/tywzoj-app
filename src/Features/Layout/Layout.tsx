import { IconButton, Panel, PanelType, Spinner, SpinnerSize, useTheme } from "@fluentui/react";
import { useEventCallback } from "@fluentui/react-hooks";
import * as React from "react";
import { NavLink } from "react-router-dom";

import { CE_PagePath } from "@/Common/Enums/PagePath";
import { useIsMobile } from "@/Features/Environment/Hooks";
import { getSiteName } from "@/Features/Environment/Selectors";
import { getAppLogoUrl } from "@/Features/Environment/Settings/BuildEnv";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { useAppSelector } from "@/Features/Store";

import { AppFooter } from "./Footer";
import { AppNav } from "./Nav";
import { getLayoutStyles } from "./Styles/LayoutStyles";
import { AppUserMenu } from "./UserMenu";

export interface IAppLayoutProps {
  children: React.ReactElement;
}

export const AppLayout: React.FC<IAppLayoutProps> = props => {
  const ls = useLocalizedStrings();
  const theme = useTheme();
  const isMobile = useIsMobile();
  const styles = getLayoutStyles(theme, isMobile);
  const siteName = useAppSelector(getSiteName);

  const [isNavPanelOpen, setIsNavPanelOpen] = React.useState(false);
  const openNavPanel = useEventCallback(() => setIsNavPanelOpen(true));
  const closeNavPanel = useEventCallback(() => setIsNavPanelOpen(false));

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        {isMobile && (
          <>
            <div className={styles.navButtonContainer}>
              <IconButton
                className={styles.navButton}
                iconProps={{ iconName: "GlobalNavButton" }}
                styles={{ icon: { fontSize: 20 } }}
                tabIndex={0}
                onClick={openNavPanel}
                ariaLabel={ls.LS_APP_NAV_TITLE}
              />
            </div>
            <div className={styles.logo}>
              <img src={getAppLogoUrl()} alt={siteName} />
            </div>
          </>
        )}
        <div className={styles.userMenuContainer}>
          <AppUserMenu />
        </div>
      </div>
      {isMobile ? (
        <Panel
          className={styles.navPanel}
          type={PanelType.customNear}
          isOpen={isNavPanelOpen}
          onDismiss={closeNavPanel}
          closeButtonAriaLabel={ls.LS_COMMON_CLOSE_BUTTON_TITLE}
          headerText={ls.LS_APP_NAV_TITLE}
        >
          <AppNav onNavLinkClick={closeNavPanel} />
        </Panel>
      ) : (
        <div className={styles.navbar}>
          <div className={styles.logo}>
            <NavLink to={CE_PagePath.Home}>
              <img src={getAppLogoUrl()} alt={siteName} />
            </NavLink>
          </div>
          <AppNav />
        </div>
      )}
      <div className={styles.mainContainer}>
        <React.Suspense fallback={<Spinner size={SpinnerSize.large} className={styles.spinner} />}>
          <div className={styles.mainContent}>{props.children}</div>
        </React.Suspense>
        <AppFooter />
      </div>
    </div>
  );
};
