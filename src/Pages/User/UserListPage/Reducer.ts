import { createReducer } from "@reduxjs/toolkit";

import { setUserListPage } from "./Action";
import { IUserListPageState } from "./Types";

const initialUserListPageState: IUserListPageState = {
  userList: [],
  count: 0,
  userSearchResults: [],
};

export const userListPageReducer = createReducer(initialUserListPageState, builder => {
  builder.addCase(setUserListPage, (state, action) => ({
    ...state,
    ...action.payload,
  }));
});
