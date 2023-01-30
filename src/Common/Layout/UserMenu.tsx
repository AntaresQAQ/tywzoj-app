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

import { useCurrentUser, useIsMobile } from "@/Common/Environment/Hooks";
import { useGravatar } from "@/Common/Hooks/Gravatar";
import { getUserMenuStyles } from "@/Common/Layout/Styles/UserMenuStyles";
import { useLocalizedStrings } from "@/Common/LocalizedString/Hooks";
import { CE_PagePath } from "@/Common/Url/PagePath";
import { makeUrl } from "@/Common/Url/Utils";
import { checkIsAllowed } from "@/Common/UserLevel/Checker";
import { CE_Permissions } from "@/Common/UserLevel/Permissions";

export const AppUserMenu: React.FC = () => {
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
      },
    );

    return items;
  }, [currentUser, ls]);

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
