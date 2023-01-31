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
import { useCurrentUser, useIsMobile } from "@/Common/Environment/Hooks";
import { useGravatar } from "@/Common/Hooks/Gravatar";
import { logoutAction } from "@/Common/Layout/Action";
import { getUserMenuStyles } from "@/Common/Layout/Styles/UserMenuStyles";
import { useLocalizedStrings } from "@/Common/LocalizedString/Hooks";
import { checkIsAllowed } from "@/Common/Utilities/PermissionChecker";
import { makeUrl } from "@/Common/Utilities/Url";
import { useAppDispatch } from "@/Store";

export const AppUserMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useCurrentUser();
  const theme = useTheme();
  const isMobile = useIsMobile();
  const gravatar = useGravatar();
  const navigate = useNavigate();
  const ls = useLocalizedStrings();
  const styles = getUserMenuStyles(theme, isMobile);

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

    // TODO: navigator need to be finished.
    const items: IContextualMenuItem[] = [
      {
        key: "profile",
        text: ls.LS_APP_HEADER_USER_MENU_PROFILE,
        iconProps: { iconName: "ContactInfo" },
      },
      {
        key: "edit",
        text: ls.LS_APP_HEADER_USER_MENU_EDIT,
        iconProps: { iconName: "EditContact" },
      },
      {
        key: "setting",
        text: ls.LS_APP_HEADER_USER_MENU_SETTINGS,
        iconProps: { iconName: "PlayerSettings" },
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
          iconProps: { iconName: "Settings" },
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
        iconProps: { iconName: "SignOut" },
        onClick: onSignOutClick,
      },
    );

    return items;
  }, [currentUser, ls, onSignOutClick]);

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
              hidePersonaDetails={isMobile}
              imageUrl={gravatar(currentUser.avatar, 40)}
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
          <ActionButton iconProps={{ iconName: "Signin" }} onClick={onSignInClick}>
            {ls.LS_COMMON_SIGN_IN_TITLE}
          </ActionButton>
          <ActionButton iconProps={{ iconName: "AddFriend" }} onClick={onSignUpClick}>
            {ls.LS_COMMON_SIGN_UP_TITLE}
          </ActionButton>
        </>
      )}
    </div>
  );
};
