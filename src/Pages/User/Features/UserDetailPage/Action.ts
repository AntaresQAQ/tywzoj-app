import { createAction } from "@reduxjs/toolkit";

import { IAppDispatch } from "@/Features/Store";
import { getUserDetailRequestAsync } from "@/Pages/User/Features/UserDetailPage/Request";

import { IUserDetailPageState } from "./Types";

const UPDATE_USER_DETAIL_PAGE = "UserDetailPage/Update";

export const setUserDetailPage = createAction(UPDATE_USER_DETAIL_PAGE, (props: Partial<IUserDetailPageState>) => ({
  payload: props,
}));

export const fetchUserDetailAction = (id: string) => async (dispatch: IAppDispatch) => {
  const { data } = await getUserDetailRequestAsync(id);
  dispatch(
    setUserDetailPage({
      userDetail: data,
    }),
  );
};
