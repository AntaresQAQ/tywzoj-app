import { useTheme } from "@fluentui/react";
import {
    BulletedListIcon,
    ChartIcon,
    CommentIcon,
    ContactListIcon,
    HomeIcon,
    LibraryIcon,
    TaskListIcon,
    WaitlistConfirmIcon,
} from "@fluentui/react-icons-mdl2";
import * as React from "react";
import { NavLink } from "react-router-dom";

import { CE_Page } from "@/Common/Enums/PagePath";
import { useCurrentUser } from "@/Features/Environment/Hooks";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { checkIsAllowed } from "@/Features/Permission/Checker";
import { CE_Permission } from "@/Features/Permission/Enums/Permission";

import { getNavStyles } from "./Styles/NavStyles";

export interface IAppNavProps {
    onNavLinkClick?: () => void;
}

interface INavItem {
    name: string;
    to: CE_Page;
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
                to: CE_Page.Home,
                icon: <HomeIcon />,
            },
        ];

        if (currentUser) {
            items.push(
                {
                    name: ls.LS_APP_NAV_PAGE_NAME_PROBLEM_PAGE,
                    to: CE_Page.Problem,
                    icon: <BulletedListIcon />,
                },
                {
                    name: ls.LS_APP_NAV_PAGE_NAME_PROBLEM_SET_PAGE,
                    to: CE_Page.ProblemSet,
                    icon: <LibraryIcon />,
                },
            );

            if (checkIsAllowed(currentUser.level, CE_Permission.AccessHomework)) {
                items.push({
                    name: ls.LS_APP_NAV_PAGE_NAME_HOMEWORK_PAGE,
                    to: CE_Page.Homework,
                    icon: <WaitlistConfirmIcon />,
                });
            }

            items.push(
                {
                    name: ls.LS_APP_NAV_PAGE_NAME_CONTEST_PAGE,
                    to: CE_Page.Contest,
                    icon: <ChartIcon />,
                },
                {
                    name: ls.LS_APP_NAV_PAGE_NAME_SUBMISSION_PAGE,
                    to: CE_Page.Submission,
                    icon: <TaskListIcon />,
                },
                {
                    name: ls.LS_APP_NAV_PAGE_NAME_USER_PAGE,
                    to: CE_Page.User,
                    icon: <ContactListIcon />,
                },
                {
                    name: ls.LS_APP_NAV_PAGE_NAME_DISCUSSION_PAGE,
                    to: CE_Page.Discussion,
                    icon: <CommentIcon />,
                },
            );
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
