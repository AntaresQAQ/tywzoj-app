import { createReducer } from "@reduxjs/toolkit";

import { setLoginPageState } from "@/Pages/Login/Features/Action";

import { CE_LoginType, ILoginPageState } from "./Types";

const initialLoginPageState: ILoginPageState = {
  loginType: CE_LoginType.Username,
  username: "",
  email: "",
  password: "",
  loading: false,
  uError: "",
  pError: "",
};

export const loginPageReducer = createReducer<ILoginPageState>(initialLoginPageState, builder => {
  builder.addCase(setLoginPageState, (state, action) => ({
    ...state,
    ...action.payload,
  }));
});
