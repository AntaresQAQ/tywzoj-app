import { Icon, useTheme } from "@fluentui/react";
import * as React from "react";
import { NavLink } from "react-router-dom";

import { useLocalizedStrings } from "@/Common/LocalizedString/Hooks";
import { CE_PagePath } from "@/Common/Url/PagePath";

import { getNavStyles } from "./Styles/NavStyles";

export interface IAppNavProps {
  onNavLinkClick?: () => void;
}

interface INavItem {
  name: string;
  to: CE_PagePath;
  icon: string;
}

export const AppNav: React.FC<IAppNavProps> = props => {
  const { onNavLinkClick } = props;

  const theme = useTheme();
  const ls = useLocalizedStrings();
  const styles = getNavStyles(theme);

  const navList = React.useMemo((): INavItem[] => {
    return [
      {
        name: ls.LS_APP_NAV_PAGE_NAME_HOME_PAGE,
        to: CE_PagePath.Home,
        icon: "Home",
      },
      {
        name: ls.LS_APP_NAV_PAGE_NAME_PROBLEM_PAGE,
        to: CE_PagePath.Problem,
        icon: "BulletedList",
      },
      {
        name: ls.LS_APP_NAV_PAGE_NAME_PROBLEM_SET_PAGE,
        to: CE_PagePath.ProblemSet,
        icon: "Library",
      },
      {
        name: ls.LS_APP_NAV_PAGE_NAME_HOMEWORK_PAGE,
        to: CE_PagePath.Homework,
        icon: "WaitlistConfirm",
      },
      {
        name: ls.LS_APP_NAV_PAGE_NAME_CONTEST_PAGE,
        to: CE_PagePath.Contest,
        icon: "Chart",
      },
    ];
  }, [ls]);

  return (
    <div className={styles.navList}>
      {navList.map((navItem, index) => (
        <NavLink
          className={styles.navItem}
          aria-label={navItem.name}
          to={navItem.to}
          onClick={onNavLinkClick}
          key={index}
        >
          <Icon className={styles.navIcon} iconName={navItem.icon} />
          {navItem.name}
        </NavLink>
      ))}
    </div>
  );
};
