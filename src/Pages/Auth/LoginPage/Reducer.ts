import { createReducer } from "@reduxjs/toolkit";

import { setLoginPageState } from "@/Pages/Auth/LoginPage/Action";

import { CE_LoginType, ILoginPageState } from "./Types";

const initialLoginPageState: ILoginPageState = {
    loginType: CE_LoginType.Username,
    username: "",
    email: "",
    password: "",
    loading: false,
    uError: null,
    pError: null,
};

export const loginPageReducer = createReducer<ILoginPageState>(initialLoginPageState, builder => {
    builder.addCase(setLoginPageState, (state, action) => ({
        ...state,
        ...action.payload,
    }));
});
