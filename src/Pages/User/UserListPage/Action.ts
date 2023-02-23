import { createAction } from "@reduxjs/toolkit";

import { IAppDispatch } from "@/Features/Store";

import { getUserListRequestAsync } from "./Request";
import { CE_SortBy, IUserListPageState } from "./Types";

const UPDATE_USER_LIST = "UserListPage/UserList/Update";

export const setUserListPage = createAction(UPDATE_USER_LIST, (props: Partial<IUserListPageState>) => ({
  payload: props,
}));

export const fetchUserListAction =
  (sortBy: CE_SortBy, skipCount: number, takeCount: number) => async (dispatch: IAppDispatch) => {
    const { data } = await getUserListRequestAsync(sortBy, skipCount, takeCount);
    if (data) {
      dispatch(
        setUserListPage({
          userList: data.users,
          count: data.count,
        }),
      );
    }
  };
