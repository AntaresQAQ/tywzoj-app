import {
  ActionButton,
  ContextualMenu,
  ContextualMenuItemType,
  IContextualMenuItem,
  Persona,
  PersonaSize,
  useTheme,
} from "@fluentui/react";
import { useEventCallback } from "@fluentui/react-hooks";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { CE_Page } from "@/Common/Enums/PagePath";
import { useGravatar } from "@/Common/Hooks/Gravatar";
import {
  registerAddFriendIcon,
  registerContactInfoIcon,
  registerEditContactIcon,
  registerPlayerSettingsIcon,
  registerSettingsIcon,
  registerSigninIcon,
  registerSignOutIcon,
} from "@/Common/IconRegistration";
import { makeUrl } from "@/Common/Utilities/Url";
import { useCurrentUser, useIsMobileView } from "@/Features/Environment/Hooks";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { checkIsAllowed } from "@/Features/Permission/Checker";
import { CE_Permission } from "@/Features/Permission/Enums/Permission";
import { useAppDispatch } from "@/Features/Store";

import { logoutAction } from "./Action";
import { getUserMenuStyles } from "./Styles/UserMenuStyles";

const contactInfoIconName = registerContactInfoIcon();
const editContactIconName = registerEditContactIcon();
const playerSettingsIconName = registerPlayerSettingsIcon();
const settingsIconName = registerSettingsIcon();
const signOutIconName = registerSignOutIcon();
const signinIconName = registerSigninIcon();
const addFriendIconName = registerAddFriendIcon();

export const AppUserMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useCurrentUser();
  const theme = useTheme();
  const isMobileView = useIsMobileView();
  const gravatar = useGravatar(40);
  const navigate = useNavigate();
  const ls = useLocalizedStrings();
  const styles = getUserMenuStyles(theme, isMobileView);

  const userContainerRef = React.useRef<HTMLDivElement>(null);
  const [isShowUserMenu, setIsShowUserMenu] = React.useState(false);
  const hideUserMenu = useEventCallback(() => setIsShowUserMenu(false));
  const onUserClick = useEventCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsShowUserMenu(s => !s);
  });

  const onSignInClick = React.useCallback(() => {
    navigate(makeUrl({ page: CE_Page.Login }));
  }, [navigate]);

  const onSignUpClick = React.useCallback(() => {
    navigate(makeUrl({ page: CE_Page.Register }));
  }, [navigate]);

  const onSignOutClick = React.useCallback(() => {
    dispatch(logoutAction()).then(() => {
      navigate(makeUrl({ page: CE_Page.Home }));
    });
  }, [dispatch, navigate]);

  const userMenuItems = React.useMemo(() => {
    if (!currentUser) return [];

    const items: IContextualMenuItem[] = [
      {
        key: "profile",
        text: ls.LS_APP_HEADER_USER_MENU_PROFILE,
        iconProps: { iconName: contactInfoIconName },
        onClick: () => navigate(makeUrl({ page: CE_Page.UserDetail, params: { id: currentUser.id } })),
      },
      {
        key: "edit",
        text: ls.LS_APP_HEADER_USER_MENU_EDIT,
        iconProps: { iconName: editContactIconName },
        onClick: () => navigate(makeUrl({ page: CE_Page.UserEdit, params: { id: currentUser.id } })),
      },
      {
        key: "setting",
        text: ls.LS_APP_HEADER_USER_MENU_SETTINGS,
        iconProps: { iconName: playerSettingsIconName },
        onClick: () => navigate(makeUrl({ page: CE_Page.UserSetting, params: { id: currentUser.id } })),
      },
    ];

    if (checkIsAllowed(currentUser.level, CE_Permission.ManageSite)) {
      items.push(
        {
          key: "divider_1",
          itemType: ContextualMenuItemType.Divider,
        },
        {
          key: "manage_site",
          text: ls.LS_APP_HEADER_USER_MENU_MANAGE_SITE,
          iconProps: { iconName: settingsIconName },
          // TODO: navigator need to be finished.
        },
      );
    }

    items.push(
      {
        key: "divider_2",
        itemType: ContextualMenuItemType.Divider,
      },
      {
        key: "sign_out",
        text: ls.LS_COMMON_SIGN_OUT_TITLE,
        iconProps: { iconName: signOutIconName },
        onClick: onSignOutClick,
      },
    );

    return items;
  }, [currentUser, ls, navigate, onSignOutClick]);

  return (
    <div className={styles.root} ref={userContainerRef}>
      {currentUser ? (
        <>
          <a tabIndex={0} onClick={onUserClick} href="#">
            <Persona
              size={PersonaSize.size40}
              imageAlt={currentUser.username}
              text={currentUser.username}
              secondaryText={currentUser.nickname}
              hidePersonaDetails={isMobileView}
              imageUrl={currentUser.avatar && gravatar(currentUser.avatar)}
              showInitialsUntilImageLoads={true}
            />
          </a>
          <ContextualMenu
            hidden={!isShowUserMenu}
            target={userContainerRef}
            items={userMenuItems}
            onDismiss={hideUserMenu}
            onItemClick={hideUserMenu}
            shouldFocusOnMount={true}
          />
        </>
      ) : (
        <>
          <ActionButton iconProps={{ iconName: signinIconName }} onClick={onSignInClick}>
            {ls.LS_COMMON_SIGN_IN_TITLE}
          </ActionButton>
          <ActionButton iconProps={{ iconName: addFriendIconName }} onClick={onSignUpClick}>
            {ls.LS_COMMON_SIGN_UP_TITLE}
          </ActionButton>
        </>
      )}
    </div>
  );
};
