import { useTheme } from "@fluentui/react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { Paginate } from "@/Common/Components/Paginate";
import { CE_Page } from "@/Common/Enums/PagePath";
import { useSetSortBy } from "@/Common/Hooks/SortBy";
import { makeUrl } from "@/Common/Utilities/Url";
import { setPageName } from "@/Features/Environment/Action";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { useAppDispatch, useAppSelector } from "@/Features/Store";
import { UserListTable } from "@/Pages/User/UserListPage/UserListTable";

import { getUserCount, getUserList } from "./Selectors";
import { CE_SortBy } from "./Types";
import { getUserListPageStyles } from "./UserListPageStyles";

export interface IUserListPageProps {
  loading: boolean;
  takeCount: number;
  sortBy: CE_SortBy;
}

export const UserListPage: React.FC<IUserListPageProps> = props => {
  const { loading, takeCount, sortBy } = props;

  const dispatch = useAppDispatch();

  const userList = useAppSelector(getUserList);
  const userCount = useAppSelector(getUserCount);

  const ls = useLocalizedStrings();
  const theme = useTheme();
  const styles = getUserListPageStyles(theme);

  const navigate = useNavigate();
  const setSortBy = useSetSortBy<CE_SortBy>();

  React.useEffect(() => {
    dispatch(setPageName(ls.LS_APP_NAV_PAGE_NAME_USER_PAGE));
  }, [dispatch, ls]);

  return (
    <div className={styles.root}>
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}></div>
        <div className={styles.tableContainer}>
          <UserListTable
            userList={userList}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onClickUser={user =>
              navigate(
                makeUrl({
                  page: CE_Page.UserDetail,
                  params: { id: user.id },
                }),
              )
            }
            className={styles.table}
            loading={loading}
          />
        </div>
        <div className={styles.paginateContainer}>
          <Paginate count={userCount} takeCount={takeCount} disabled={loading} />
        </div>
      </div>
    </div>
  );
};
