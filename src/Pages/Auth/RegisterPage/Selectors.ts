import { createSelector } from "@reduxjs/toolkit";

import { IRootState } from "@/Features/Store";

export const getRegisterPageUsername = (state: IRootState) => state.registerPage.username;
export const getRegisterPageEmail = (state: IRootState) => state.registerPage.email;
export const getRegisterPagePassword = (state: IRootState) => state.registerPage.password;
export const getRegisterPageSecondaryPassword = (state: IRootState) => state.registerPage.secondaryPassword;
export const getRegisterPageCode = (state: IRootState) => state.registerPage.code;
export const getRegisterPageUsernameError = (state: IRootState) => state.registerPage.uError;
export const getRegisterPageEmailError = (state: IRootState) => state.registerPage.eError;
export const getRegisterPagePasswordError = (state: IRootState) => state.registerPage.pError;
export const getRegisterPage2ndPasswordError = (state: IRootState) => state.registerPage.spError;
export const getRegisterPageCodeError = (state: IRootState) => state.registerPage.cError;
export const getHasError = createSelector(
    getRegisterPageUsernameError,
    getRegisterPageEmailError,
    getRegisterPagePasswordError,
    getRegisterPage2ndPasswordError,
    getRegisterPageCodeError,
    (u, e, p1, p2, c) => !!(u || e || p1 || p2 || c),
);
