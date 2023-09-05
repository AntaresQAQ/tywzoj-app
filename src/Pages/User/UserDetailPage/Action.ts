import { createAction } from "@reduxjs/toolkit";

import { IAppDispatch } from "@/Features/Store";
import { getUserDetailRequestAsync } from "@/Pages/User/UserDetailPage/Request";

import { IUserDetailPageState } from "./Types";

const UPDATE_USER_DETAIL_PAGE = "UserDetailPage/Update";

export const setUserDetailPage = createAction(UPDATE_USER_DETAIL_PAGE, (props: Partial<IUserDetailPageState>) => ({
    payload: props,
}));

export const fetchUserDetailAction = (id: string) => async (dispatch: IAppDispatch) => {
    const { data, error } = await getUserDetailRequestAsync(id);
    if (error) return false;
    dispatch(
        setUserDetailPage({
            userDetail: data,
        }),
    );
    return true;
};
