import { createAction } from "@reduxjs/toolkit";

import { memo } from "@/Common/Utilities/Tools";
import { IAppDispatch } from "@/Features/Store";

import { getUserListRequestAsync, getUserSearchRequestAsync } from "./Request";
import { CE_SortBy, IUserListPageState } from "./Types";

const UPDATE_USER_LIST = "UserListPage/Update";

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

const memorizedSearchRequestAsync = memo(getUserSearchRequestAsync, 30000 /* 30s */);
export const searchUserAction = (keywords: string) => async (dispatch: IAppDispatch) => {
    const { data } = await memorizedSearchRequestAsync(keywords);
    if (data) {
        dispatch(
            setUserListPage({
                userSearchResults: data.users,
            }),
        );
    }
};
