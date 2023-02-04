/* eslint-disable react/prop-types */
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
import {
  AddFriendIcon,
  ContactInfoIcon,
  EditContactIcon,
  PlayerSettingsIcon,
  SettingsIcon,
  SigninIcon,
  SignOutIcon,
} from "@fluentui/react-icons-mdl2";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { CE_PagePath } from "@/Common/Enums/PagePath";
import { CE_Permissions } from "@/Common/Enums/Permissions";
import { useGravatar } from "@/Common/Hooks/Gravatar";
import { checkIsAllowed } from "@/Common/Utilities/PermissionChecker";
import { makeUrl } from "@/Common/Utilities/Url";
import { useCurrentUser, useIsMobile } from "@/Features/Environment/Hooks";
import { logoutAction } from "@/Features/Layout/Action";
import { getUserMenuStyles } from "@/Features/Layout/Styles/UserMenuStyles";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { useAppDispatch } from "@/Features/Store";

export const AppUserMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useCurrentUser();
  const theme = useTheme();
  const isMobile = useIsMobile();
  const gravatar = useGravatar(40);
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
        iconProps: {},
        onRenderIcon: props => <ContactInfoIcon className={props.classNames.icon} />,
      },
      {
        key: "edit",
        text: ls.LS_APP_HEADER_USER_MENU_EDIT,
        iconProps: {},
        onRenderIcon: props => <EditContactIcon className={props.classNames.icon} />,
      },
      {
        key: "setting",
        text: ls.LS_APP_HEADER_USER_MENU_SETTINGS,
        iconProps: {},
        onRenderIcon: props => <PlayerSettingsIcon className={props.classNames.icon} />,
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
          iconProps: {},
          onRenderIcon: props => <SettingsIcon className={props.classNames.icon} />,
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
        iconProps: {},
        onRenderIcon: props => <SignOutIcon className={props.classNames.icon} />,
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
          <ActionButton onRenderIcon={() => <SigninIcon className={styles.icon} />} onClick={onSignInClick}>
            {ls.LS_COMMON_SIGN_IN_TITLE}
          </ActionButton>
          <ActionButton onRenderIcon={() => <AddFriendIcon className={styles.icon} />} onClick={onSignUpClick}>
            {ls.LS_COMMON_SIGN_UP_TITLE}
          </ActionButton>
        </>
      )}
    </div>
  );
};
