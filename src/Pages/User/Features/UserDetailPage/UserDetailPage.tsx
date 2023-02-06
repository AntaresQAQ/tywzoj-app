import { DefaultButton, format, Image, ImageFit, Link, TooltipHost, useTheme } from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import * as React from "react";
import { useParams } from "react-router-dom";

import { IconButton } from "@/Common/Components/IconButton";
import { UserLevelLabel } from "@/Common/Components/UserLevelLabel";
import { useGravatar } from "@/Common/Hooks/Gravatar";
import { useMomentFormatter } from "@/Common/Hooks/Moment";
import { registerEditIcon } from "@/Common/IconRegistration";
import { runOnce } from "@/Common/Utilities/Tools";
import { setPageName } from "@/Features/Environment/Action";
import { useIsMiddleScreen, useIsMobileView, useIsSmallScreen } from "@/Features/Environment/Hooks";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { useAppDispatch, useAppSelector } from "@/Features/Store";
import { injectDynamicReducer } from "@/Features/Store/Helper";

import { fetchUserDetailAction } from "./Action";
import { userDetailPageReducer } from "./Reducer";
import { getUserDetail } from "./Selectors";
import { getUserDetailPageStyles } from "./UserDetailPageStyles";

const configureStore = runOnce(() => {
  injectDynamicReducer({
    userDetailPage: userDetailPageReducer,
  });
});
configureStore();

const editIconName = registerEditIcon();

export const UserDetailPage: React.FC = () => {
  const { id } = useParams();
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

  // Fetch data
  React.useEffect(() => {
    dispatch(fetchUserDetailAction(id));
  }, [dispatch, id]);

  React.useEffect(() => {
    dispatch(setPageName(`${userDetail.username} - ${ls.LS_USER_DETAIL_PAGE_TITLE}`));
  }, [dispatch, ls, userDetail]);

  const editButton = React.useMemo(() => {
    return isMiddleScreen ? (
      <TooltipHost content={ls.LS_APP_HEADER_USER_MENU_EDIT} id={editButtonTooltipId}>
        <IconButton
          className={styles.editButton}
          iconProps={{ iconName: editIconName }}
          ariaLabel={ls.LS_APP_HEADER_USER_MENU_EDIT}
          aria-describedby={editButtonTooltipId}
        />
      </TooltipHost>
    ) : (
      <DefaultButton className={styles.editButton}>{ls.LS_APP_HEADER_USER_MENU_EDIT}</DefaultButton>
    );
  }, [editButtonTooltipId, isMiddleScreen, ls, styles]);

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
          <div className={styles.editButtonContainer}>{editButton}</div>
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
                <Link href={`mailto:${userDetail.email}`}>{userDetail.email}</Link>
              </div>
            )}
            <div className={styles.registrationTime}>
              {format(ls.LS_USER_DETAIL_PAGE_REG_TIME, momentFormatter(userDetail.registrationTime, "lll"))}
            </div>
          </div>
        )}
        <div className={styles.bottom}></div>
      </div>
    </div>
  );
};
