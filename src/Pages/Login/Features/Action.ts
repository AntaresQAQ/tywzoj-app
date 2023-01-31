import { createAction } from "@reduxjs/toolkit";

import { CE_RecaptchaAction } from "@/Common/Enums/RecaptchaAction";
import { setCurrentUser, setEnvApiBearerToken } from "@/Common/Environment/Action";
import { CE_ErrorCode } from "@/Common/Error/Code";
import { AppException } from "@/Common/Error/Exception";
import { getLocalizedStrings } from "@/Common/LocalizedString/Selectors";
import { postLoginRequestAsync } from "@/Pages/Login/Features/Request";
import {
  getLoginPageEmail,
  getLoginPageLoginType,
  getLoginPagePassword,
  getLoginPageUsername,
} from "@/Pages/Login/Features/Selectors";
import { CE_LoginType, ILoginPageState, IPostLoginResponse } from "@/Pages/Login/Features/Types";
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
    const password = getLoginPagePassword(state);

    const recaptchaToken = await recaptcha(CE_RecaptchaAction.Login);
    let response: IPostLoginResponse;
    try {
      if (loginType === CE_LoginType.Username) {
        const username = getLoginPageUsername(state);
        response = await postLoginRequestAsync({ username, password }, recaptchaToken);
      } else if (loginType === CE_LoginType.Email) {
        const email = getLoginPageEmail(state);
        response = await postLoginRequestAsync({ email, password }, recaptchaToken);
      }
      dispatch(setEnvApiBearerToken(response.token));
      dispatch(setCurrentUser(response.userBaseDetail));
      return true;
    } catch (e) {
      if (e instanceof AppException) {
        const ls = getLocalizedStrings(state);
        if (e.code === CE_ErrorCode.Auth_NoSuchUser) {
          dispatch(setLoginPageState({ uError: ls.LS_LOGIN_PAGE_NO_SUCH_USER_ERROR }));
        } else if (e.code === CE_ErrorCode.Auth_WrongPassword) {
          dispatch(setLoginPageState({ pError: ls.LS_LOGIN_PAGE_WRONG_PASSWORD_ERROR }));
        } else {
          throw e;
        }
      }
    }
    dispatch(setLoginPageState({ loading: false }));
    return false;
  };
