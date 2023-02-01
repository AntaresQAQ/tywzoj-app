import { createAction } from "@reduxjs/toolkit";

import { CE_RecaptchaAction } from "@/Common/Enums/RecaptchaAction";
import { setCurrentUser, setEnvApiBearerToken } from "@/Common/Environment/Action";
import { CE_ErrorCode } from "@/Common/Error/Code";
import { getLocalizedStrings } from "@/Common/LocalizedString/Selectors";
import { postLoginRequestAsync } from "@/Pages/Login/Features/Request";
import {
  getLoginPageEmail,
  getLoginPageLoginType,
  getLoginPagePassword,
  getLoginPageUsername,
} from "@/Pages/Login/Features/Selectors";
import { CE_LoginType, ILoginPageState, IPostLoginRequestBody } from "@/Pages/Login/Features/Types";
import { IAppDispatch, IRootState } from "@/Store";

const UPDATE_LOGIN_PAGE = "LoginPage/Update";

export const setLoginPageState = createAction(UPDATE_LOGIN_PAGE, (props: Partial<ILoginPageState>) => ({
  payload: props,
}));

export const initLoginPageState = (dispatch: IAppDispatch) => {
  dispatch(
    setLoginPageState({
      uError: "",
      pError: "",
      loading: false,
    }),
  );
};

const validateAction = (dispatch: IAppDispatch, getState: () => IRootState) => {
  const state = getState();
  const loginType = getLoginPageLoginType(state);
  const ls = getLocalizedStrings(state);
  const uoe = loginType === CE_LoginType.Username ? getLoginPageUsername(state) : getLoginPageEmail(state);

  let succeed = true;

  if (!uoe) {
    dispatch(setLoginPageState({ uError: ls.LS_COMMON_EMPTY_FIELD_ERROR_MESSAGE }));
    succeed = false;
  }

  const password = getLoginPagePassword(state);
  if (!password) {
    dispatch(setLoginPageState({ pError: ls.LS_COMMON_EMPTY_FIELD_ERROR_MESSAGE }));
    succeed = false;
  }

  return succeed;
};

export const loginAction =
  (recaptcha: (action: CE_RecaptchaAction) => Promise<string>) =>
  async (dispatch: IAppDispatch, getState: () => IRootState) => {
    if (!dispatch(validateAction)) return false;

    dispatch(setLoginPageState({ loading: true, uError: "", pError: "" }));

    const state = getState();
    const loginType = getLoginPageLoginType(state);
    const username = getLoginPageUsername(state);
    const email = getLoginPageEmail(state);
    const password = getLoginPagePassword(state);
    const recaptchaToken = await recaptcha(CE_RecaptchaAction.Login);

    let body: IPostLoginRequestBody;
    if (loginType === CE_LoginType.Username) {
      body = { username, password };
    } else if (loginType === CE_LoginType.Email) {
      body = { email, password };
    } else {
      dispatch(setLoginPageState({ loading: false }));
      return false;
    }

    const { data, error } = await postLoginRequestAsync(body, recaptchaToken);

    if (error) {
      const ls = getLocalizedStrings(state);
      if (error.code === CE_ErrorCode.Auth_NoSuchUser) {
        dispatch(setLoginPageState({ uError: ls.LS_LOGIN_PAGE_NO_SUCH_USER_ERROR }));
      } else if (error.code === CE_ErrorCode.Auth_WrongPassword) {
        dispatch(setLoginPageState({ pError: ls.LS_LOGIN_PAGE_WRONG_PASSWORD_ERROR }));
      }
      dispatch(setLoginPageState({ loading: false }));
      return false;
    }

    dispatch(setEnvApiBearerToken(data.token));
    dispatch(setCurrentUser(data.userBaseDetail));
    return true;
  };
