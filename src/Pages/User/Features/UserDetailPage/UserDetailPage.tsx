import { Image, ImageFit, useTheme } from "@fluentui/react";
import * as React from "react";
import { useParams } from "react-router-dom";

import { useGravatar } from "@/Common/Hooks/Gravatar";
import { CE_UserGender } from "@/Common/ServerType/User";
import { runOnce } from "@/Common/Utilities/Tools";
import { setPageName } from "@/Features/Environment/Action";
import { useIsMiddleScreen, useIsSmallScreen } from "@/Features/Environment/Hooks";
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

export const UserDetailPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isSmallScreen = useIsSmallScreen();
  const isMiddleScreen = useIsMiddleScreen();
  const ls = useLocalizedStrings();
  const userDetail = useAppSelector(getUserDetail);
  const gravatar = useGravatar(1024, "wavatar");
  const styles = getUserDetailPageStyles(theme, isMiddleScreen, isSmallScreen);

  // Fetch data
  React.useEffect(() => {
    dispatch(fetchUserDetailAction(id));
  }, [dispatch, id]);

  React.useEffect(() => {
    dispatch(setPageName(`${userDetail.username} - ${ls.LS_USER_DETAIL_PAGE_TITLE}`));
  }, [dispatch, ls, userDetail]);

  const gender = React.useMemo(() => {
    switch (userDetail.gender) {
      case CE_UserGender.Female:
        return null;
      case CE_UserGender.Male:
        return null;
      case CE_UserGender.Other:
        return null;
      default:
        return null;
    }
  }, [userDetail]);

  return (
    <div className={styles.root}>
      <div className={styles.mainContainer}>
        <div className={styles.headerBox}>
          <div className={styles.avatarContainer}>
            <Image
              className={styles.avatar}
              src={gravatar(userDetail.avatar)}
              imageFit={ImageFit.contain}
              loading={"lazy"}
            />
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.info}>
              <div className={styles.infoRow1}>
                <span>{userDetail.username}</span>
                {gender}
              </div>
              <span>{userDetail.nickname}</span>
              <span>{userDetail.registrationTime}</span>
            </div>
          </div>
        </div>
        <div className={styles.tabsBox}></div>
      </div>
    </div>
  );
};
