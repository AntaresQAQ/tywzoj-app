import { IRootState } from "@/Features/Store";

export const getLoginPageLoginType = (state: IRootState) => state.loginPage.loginType;
export const getLoginPageUsername = (state: IRootState) => state.loginPage.username;
export const getLoginPageEmail = (state: IRootState) => state.loginPage.email;
export const getLoginPagePassword = (state: IRootState) => state.loginPage.password;
