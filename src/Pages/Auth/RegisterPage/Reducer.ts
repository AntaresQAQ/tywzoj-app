import { createReducer } from "@reduxjs/toolkit";

import { setRegisterPageState } from "./Action";
import { IRegisterPageState } from "./Types";

const initialRegisterPageState: IRegisterPageState = {
    username: "",
    password: "",
    secondaryPassword: "",
    email: "",
    code: "",
    uError: null,
    pError: null,
    spError: null,
    eError: null,
    cError: null,
    sError: null,
    loading: false,
    sendCodeTime: 0,
};

export const registerPageReducer = createReducer(initialRegisterPageState, builder => {
    builder.addCase(setRegisterPageState, (state, action) => ({
        ...state,
        ...action.payload,
    }));
});
