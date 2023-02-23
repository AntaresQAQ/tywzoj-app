import {
  DefaultButton,
  format,
  Image,
  ImageFit,
  Link,
  Pivot,
  PivotItem,
  Spinner,
  SpinnerSize,
  TooltipHost,
  useTheme,
} from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { IconButton } from "@/Common/Components/IconButton";
import { UserLevelLabel } from "@/Common/Components/UserLevelLabel";
import { CE_Page } from "@/Common/Enums/PagePath";
import { CE_Permissions } from "@/Common/Enums/Permissions";
import { useGravatar } from "@/Common/Hooks/Gravatar";
import { useMomentFormatter } from "@/Common/Hooks/Moment";
import { registerEditIcon } from "@/Common/IconRegistration";
import { checkIsAllowed } from "@/Common/Utilities/PermissionChecker";
import { makeEmailUrl, makeUrl } from "@/Common/Utilities/Url";
import { setPageName } from "@/Features/Environment/Action";
import { useCurrentUser, useIsMiddleScreen, useIsMobileView, useIsSmallScreen } from "@/Features/Environment/Hooks";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { useAppDispatch, useAppSelector } from "@/Features/Store";

import { getUserDetail } from "./Selectors";
import { getUserDetailPageStyles } from "./Styles/UserDetailPageStyles";
import { UserInfoShimmer } from "./UserInfoShimmer";

const loadUserInformationRenderer = () => import("./UserInformationRenderer");

const editIconName = registerEditIcon();

const UserInformationRendererLazy = React.lazy(loadUserInformationRenderer);

export const UserDetailPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isSmallScreen = useIsSmallScreen();
  const isMiddleScreen = useIsMiddleScreen();
  const isMobileView = useIsMobileView();
  const ls = useLocalizedStrings();
  const userDetail = useAppSelector(getUserDetail);
  const gravatar = useGravatar(1024, "wavatar");
  const styles = getUserDetailPageStyles(theme, isMiddleScreen, isSmallScreen, isMobileView);
  const editButtonTooltipId = useId("tooltip_edit");
  const momentFormatter = useMomentFormatter();
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const allowedEdit =
    currentUser && (currentUser.id === userDetail.id || checkIsAllowed(currentUser.level, CE_Permissions.ManageUser));

  // Update page name
  React.useEffect(() => {
    dispatch(setPageName(`${userDetail.username} - ${ls.LS_USER_DETAIL_PAGE_TITLE}`));
  }, [dispatch, ls, userDetail]);

  const editButton = React.useMemo(() => {
    const onClick = () => navigate(makeUrl({ page: CE_Page.UserEdit, params: { id: userDetail.id } }));

    return isMiddleScreen ? (
      <TooltipHost content={ls.LS_APP_HEADER_USER_MENU_EDIT} id={editButtonTooltipId}>
        <IconButton
          className={styles.editButton}
          iconProps={{ iconName: editIconName }}
          ariaLabel={ls.LS_APP_HEADER_USER_MENU_EDIT}
          aria-describedby={editButtonTooltipId}
          onClick={onClick}
        />
      </TooltipHost>
    ) : (
      <DefaultButton className={styles.editButton} onClick={onClick}>
        {ls.LS_APP_HEADER_USER_MENU_EDIT}
      </DefaultButton>
    );
  }, [editButtonTooltipId, isMiddleScreen, ls, navigate, styles, userDetail]);

  return (
    <div className={styles.root}>
      <div className={styles.mainContainer}>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <Image
              className={styles.avatar}
              src={gravatar(userDetail.avatar)}
              imageFit={ImageFit.cover}
              loading={"lazy"}
            />
          </div>
          <div className={styles.topRight}>
            <div className={styles.unmLblRow}>
              <div
                className={styles.username}
                aria-label={format(ls.LS_USER_DETAIL_PAGE_USERNAME_ARIA_LABEL, userDetail.username)}
              >
                {userDetail.username}
              </div>
              <UserLevelLabel level={userDetail.level} />
            </div>
            {!isMobileView && userDetail.nickname && (
              <div
                className={styles.nickname}
                aria-label={format(ls.LS_USER_DETAIL_PAGE_NICKNAME_ARIA_LABEL, userDetail.nickname)}
              >
                {userDetail.nickname}
              </div>
            )}
            {!isSmallScreen && userDetail.email && (
              <div className={styles.email}>
                <span>{ls.LS_USER_DETAIL_PAGE_EMAIL}</span>
                <Link href={`mailto:${userDetail.email}`}>{userDetail.email}</Link>
              </div>
            )}
            {!isSmallScreen && (
              <div className={styles.registrationTime}>
                {format(ls.LS_USER_DETAIL_PAGE_REG_TIME, momentFormatter(userDetail.registrationTime, "lll"))}
              </div>
            )}
          </div>
          {allowedEdit && <div className={styles.editButtonContainer}>{editButton}</div>}
        </div>
        {isSmallScreen && (
          <div className={styles.middle}>
            {isMobileView && userDetail.nickname && (
              <div
                className={styles.nickname}
                aria-label={format(ls.LS_USER_DETAIL_PAGE_NICKNAME_ARIA_LABEL, userDetail.nickname)}
              >
                <span>{ls.LS_USER_DETAIL_PAGE_NICKNAME}</span>
                {userDetail.nickname}
              </div>
            )}
            {userDetail.email && (
              <div className={styles.email}>
                <span>{ls.LS_USER_DETAIL_PAGE_EMAIL}</span>
                <Link href={makeEmailUrl(userDetail.email)}>{userDetail.email}</Link>
              </div>
            )}
            <div className={styles.registrationTime}>
              {format(ls.LS_USER_DETAIL_PAGE_REG_TIME, momentFormatter(userDetail.registrationTime, "lll"))}
            </div>
          </div>
        )}
        <div className={styles.bottom}>
          <Pivot>
            {userDetail.information && (
              <PivotItem headerText={ls.LS_COMMON_USER_INFO_LABEL} ariaLabel={ls.LS_COMMON_USER_INFO_LABEL}>
                <div className={styles.tabContainer}>
                  <React.Suspense fallback={<UserInfoShimmer />}>
                    <UserInformationRendererLazy content={userDetail.information} />
                  </React.Suspense>
                </div>
              </PivotItem>
            )}
            <PivotItem headerText={ls.LS_USER_DETAIL_PAGE_ANALYSIS_TAB} ariaLabel={ls.LS_USER_DETAIL_PAGE_ANALYSIS_TAB}>
              <div className={styles.tabContainer}>
                <React.Suspense fallback={<Spinner size={SpinnerSize.large} />}>
                  {/*  TODO: Submissions analysis tab */}
                </React.Suspense>
              </div>
            </PivotItem>
            <PivotItem headerText={ls.LS_COMMON_RATING_LABEL} ariaLabel={ls.LS_COMMON_RATING_LABEL}>
              <div className={styles.tabContainer}>
                <React.Suspense fallback={<Spinner size={SpinnerSize.large} />}>
                  {/*  TODO: Rating history tab */}
                </React.Suspense>
              </div>
            </PivotItem>
          </Pivot>
        </div>
      </div>
    </div>
  );
};
