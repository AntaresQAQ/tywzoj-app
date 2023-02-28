import * as React from "react";

import { useRecaptcha } from "@/Common/Hooks/Recaptcha";
import { useAppDispatch, useAppSelector } from "@/Features/Store";
import { CE_LoginType } from "@/Pages/Auth/LoginPage/Types";

import { loginAction, setLoginPageState } from "./Action";
import { getLoginPageEmail, getLoginPageLoginType, getLoginPagePassword, getLoginPageUsername } from "./Selectors";

export const useLoginProps = () => {
  const dispatch = useAppDispatch();
  const loginType = useAppSelector(getLoginPageLoginType);
  const username = useAppSelector(getLoginPageUsername);
  const email = useAppSelector(getLoginPageEmail);
  const password = useAppSelector(getLoginPagePassword);
  const isLoading = useAppSelector(state => state.loginPage.loading);
  const uErr = useAppSelector(state => state.loginPage.uError);
  const pErr = useAppSelector(state => state.loginPage.pError);
  const recaptcha = useRecaptcha();

  const usernameOrEmail = loginType === CE_LoginType.Username ? username : email;

  const updateLoginType = React.useCallback(
    (type: CE_LoginType) => {
      dispatch(setLoginPageState({ loginType: type, uError: null, pError: null }));
    },
    [dispatch],
  );
  const updateUsernameOrEmail = React.useCallback(
    (value: string) => {
      if (loginType === CE_LoginType.Username) {
        dispatch(setLoginPageState({ username: value }));
      } else if (loginType === CE_LoginType.Email) {
        dispatch(setLoginPageState({ email: value }));
      }
      dispatch(setLoginPageState({ uError: null }));
    },
    [dispatch, loginType],
  );
  const updatePassword = React.useCallback(
    (password: string) => {
      dispatch(setLoginPageState({ password, pError: null }));
    },
    [dispatch],
  );
  const doLogin = React.useCallback(() => {
    dispatch(loginAction(recaptcha));
  }, [dispatch, recaptcha]);

  return {
    isLoading,
    loginType,
    usernameOrEmail,
    password,
    updateLoginType,
    updateUsernameOrEmail,
    updatePassword,
    uErr,
    pErr,
    doLogin,
  };
};
