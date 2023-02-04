import { useTheme } from "@fluentui/react";
import {
  BulletedListIcon,
  ChartIcon,
  ContactListIcon,
  HomeIcon,
  LibraryIcon,
  WaitlistConfirmIcon,
} from "@fluentui/react-icons-mdl2";
import * as React from "react";
import { NavLink } from "react-router-dom";

import { CE_PagePath } from "@/Common/Enums/PagePath";
import { CE_Permissions } from "@/Common/Enums/Permissions";
import { checkIsAllowed } from "@/Common/Utilities/PermissionChecker";
import { useCurrentUser } from "@/Features/Environment/Hooks";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";

import { getNavStyles } from "./Styles/NavStyles";

export interface IAppNavProps {
  onNavLinkClick?: () => void;
}

interface INavItem {
  name: string;
  to: CE_PagePath;
  icon: JSX.Element;
}

export const AppNav: React.FC<IAppNavProps> = props => {
  const { onNavLinkClick } = props;

  const theme = useTheme();
  const ls = useLocalizedStrings();
  const styles = getNavStyles(theme);
  const currentUser = useCurrentUser();

  const navList = React.useMemo(() => {
    const items: INavItem[] = [
      {
        name: ls.LS_APP_NAV_PAGE_NAME_HOME_PAGE,
        to: CE_PagePath.Home,
        icon: <HomeIcon />,
      },
    ];

    if (currentUser) {
      if (checkIsAllowed(currentUser.level, CE_Permissions.AccessSite)) {
        items.push(
          {
            name: ls.LS_APP_NAV_PAGE_NAME_PROBLEM_PAGE,
            to: CE_PagePath.Problem,
            icon: <BulletedListIcon />,
          },
          {
            name: ls.LS_APP_NAV_PAGE_NAME_PROBLEM_SET_PAGE,
            to: CE_PagePath.ProblemSet,
            icon: <LibraryIcon />,
          },
        );
      }

      if (checkIsAllowed(currentUser.level, CE_Permissions.AccessHomework)) {
        items.push({
          name: ls.LS_APP_NAV_PAGE_NAME_HOMEWORK_PAGE,
          to: CE_PagePath.Homework,
          icon: <WaitlistConfirmIcon />,
        });
      }

      if (checkIsAllowed(currentUser.level, CE_Permissions.AccessSite)) {
        items.push(
          {
            name: ls.LS_APP_NAV_PAGE_NAME_CONTEST_PAGE,
            to: CE_PagePath.Contest,
            icon: <ChartIcon />,
          },
          {
            name: ls.LS_APP_NAV_PAGE_NAME_USER_PAGE,
            to: CE_PagePath.User,
            icon: <ContactListIcon />,
          },
        );
      }
    }

    return items;
  }, [currentUser, ls]);

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
          <span className={styles.navIcon}>{navItem.icon}</span>
          {navItem.name}
        </NavLink>
      ))}
    </div>
  );
};
