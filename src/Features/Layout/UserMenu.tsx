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

import { CE_PagePath } from "@/Common/Enums/PagePath";
import { CE_Permissions } from "@/Common/Enums/Permissions";
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
import { checkIsAllowed } from "@/Common/Utilities/PermissionChecker";
import { makeUrl } from "@/Common/Utilities/Url";
import { useCurrentUser, useIsMobileView } from "@/Features/Environment/Hooks";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
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
  const showUserMenu = useEventCallback(() => setIsShowUserMenu(true));
  const hideUserMenu = useEventCallback(() => setIsShowUserMenu(false));

  const onUserClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (isShowUserMenu) {
        hideUserMenu();
      } else {
        showUserMenu();
      }
    },
    [hideUserMenu, isShowUserMenu, showUserMenu],
  );

  const onSignInClick = React.useCallback(() => {
    navigate(makeUrl({ base: CE_PagePath.Login }));
  }, [navigate]);

  const onSignUpClick = React.useCallback(() => {
    navigate(makeUrl({ base: CE_PagePath.Register }));
  }, [navigate]);

  const onSignOutClick = React.useCallback(() => {
    dispatch(logoutAction()).then(() => {
      navigate(makeUrl({ base: CE_PagePath.Home }));
    });
  }, [dispatch, navigate]);

  const userMenuItems = React.useMemo(() => {
    if (!currentUser) return [];

    const items: IContextualMenuItem[] = [
      {
        key: "profile",
        text: ls.LS_APP_HEADER_USER_MENU_PROFILE,
        iconProps: { iconName: contactInfoIconName },
        onClick: () => navigate(makeUrl({ base: CE_PagePath.User, path: `${currentUser.id}` })),
      },
      {
        key: "edit",
        text: ls.LS_APP_HEADER_USER_MENU_EDIT,
        iconProps: { iconName: editContactIconName },
        onClick: () => navigate(makeUrl({ base: CE_PagePath.User, path: `${currentUser.id}/edit` })),
      },
      {
        key: "setting",
        text: ls.LS_APP_HEADER_USER_MENU_SETTINGS,
        iconProps: { iconName: playerSettingsIconName },
        onClick: () => navigate(makeUrl({ base: CE_PagePath.User, path: `${currentUser.id}/setting` })),
      },
    ];

    if (checkIsAllowed(currentUser.level, CE_Permissions.ManageSite)) {
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
              imageUrl={gravatar(currentUser.avatar)}
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
            styles={{ container: { overflow: "hidden" } }}
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