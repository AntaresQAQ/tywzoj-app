import { createReducer } from "@reduxjs/toolkit";

import { setUserDetailPage } from "@/Pages/User/Features/UserDetailPage/Action";
import { IUserDetailPageState } from "@/Pages/User/Features/UserDetailPage/Types";

const initialUserDetailPageState: IUserDetailPageState = {
  userDetail: {},
} as unknown as IUserDetailPageState;

export const userDetailPageReducer = createReducer(initialUserDetailPageState, builder => {
  builder.addCase(setUserDetailPage, (state, action) => ({
    ...state,
    ...action.payload,
  }));
});
