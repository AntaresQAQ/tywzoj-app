import { IconButton, Panel, PanelType, TooltipDelay, TooltipHost, useTheme } from "@fluentui/react";
import { useEventCallback, useId } from "@fluentui/react-hooks";
import * as React from "react";
import { NavLink } from "react-router-dom";

import { PageLoading } from "@/Common/Components/PageLoading";
import { CE_PagePath } from "@/Common/Enums/PagePath";
import { registerCancelIcon, registerGlobalNavButtonIcon } from "@/Common/IconRegistration";
import { useIsMobileView } from "@/Features/Environment/Hooks";
import { getSiteName } from "@/Features/Environment/Selectors";
import { getAppLogoUrl } from "@/Features/Environment/Settings/BuildEnv";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { useAppSelector } from "@/Features/Store";

import { loadFooter, loadNav, loadUserMenu } from "./DynamicImport";
import { getLayoutStyles } from "./Styles/LayoutStyles";

export interface IAppLayoutProps {
  children: React.ReactElement;
}

registerCancelIcon();
const globalNavButtonIconName = registerGlobalNavButtonIcon();

const NavLazy = React.lazy(loadNav);
const FooterLazy = React.lazy(loadFooter);
const UserMenuLazy = React.lazy(loadUserMenu);

export const AppLayout: React.FC<IAppLayoutProps> = props => {
  const ls = useLocalizedStrings();
  const theme = useTheme();
  const isMobileView = useIsMobileView();
  const styles = getLayoutStyles(theme, isMobileView);
  const siteName = useAppSelector(getSiteName);
  const navTooltipId = useId("nav_tooltip");

  const [isNavPanelOpen, setIsNavPanelOpen] = React.useState(false);
  const openNavPanel = useEventCallback(() => setIsNavPanelOpen(true));
  const closeNavPanel = useEventCallback(() => setIsNavPanelOpen(false));

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        {isMobileView && (
          <>
            <div className={styles.navButtonContainer}>
              <TooltipHost content={ls.LS_APP_NAV_TITLE} id={navTooltipId} delay={TooltipDelay.long}>
                <IconButton
                  className={styles.navButton}
                  iconProps={{ iconName: globalNavButtonIconName }}
                  tabIndex={0}
                  onClick={openNavPanel}
                  ariaLabel={ls.LS_APP_NAV_TITLE}
                  aria-describedby={navTooltipId}
                />
              </TooltipHost>
            </div>
            <div className={styles.logo}>
              <img src={getAppLogoUrl()} alt={siteName} />
            </div>
          </>
        )}
        <div className={styles.userMenuContainer}>
          <React.Suspense fallback={null}>
            <UserMenuLazy />
          </React.Suspense>
        </div>
      </div>
      {isMobileView ? (
        <Panel
          className={styles.navPanel}
          type={PanelType.customNear}
          isOpen={isNavPanelOpen}
          onDismiss={closeNavPanel}
          closeButtonAriaLabel={ls.LS_COMMON_CLOSE_BUTTON_TITLE}
          headerText={ls.LS_APP_NAV_TITLE}
        >
          <React.Suspense fallback={null}>
            <NavLazy onNavLinkClick={closeNavPanel} />
          </React.Suspense>
        </Panel>
      ) : (
        <div className={styles.navbar}>
          <div className={styles.logo}>
            <NavLink to={CE_PagePath.Home}>
              <img src={getAppLogoUrl()} alt={siteName} />
            </NavLink>
          </div>
          <React.Suspense fallback={null}>
            <NavLazy />
          </React.Suspense>
        </div>
      )}
      <div className={styles.mainContainer}>
        <React.Suspense fallback={<PageLoading />}>
          <div className={styles.mainContent}>{props.children}</div>
        </React.Suspense>
        <React.Suspense fallback={null}>
          <FooterLazy />
        </React.Suspense>
      </div>
    </div>
  );
};
