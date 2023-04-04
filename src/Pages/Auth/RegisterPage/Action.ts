import { createAction } from "@reduxjs/toolkit";

import { CE_ErrorCode } from "@/Common/Enums/ErrorCode";
import { CE_RecaptchaAction } from "@/Common/Enums/RecaptchaAction";
import { RecaptchaType } from "@/Common/Types/Recaptcha";
import { isEmail, isUsername } from "@/Common/Utilities/Validations";
import { setCurrentUser, setEnv, setEnvApiBearerToken } from "@/Features/Environment/Action";
import { getRequireEmailVerification } from "@/Features/Environment/Selectors";
import { initUserPreferenceConfigAsync } from "@/Features/Initialization";
import { getLanguage, getLocalizedStrings } from "@/Features/LocalizedString/Selectors";
import { IAppDispatch, IRootState } from "@/Features/Store";

import {
  getCheckUsernameRequestAsync,
  postRegisterRequestAsync,
  postSendRegisterEmailVerificationCodeRequestAsync,
} from "./Request";
import {
  getHasError,
  getRegisterPageCode,
  getRegisterPageEmail,
  getRegisterPagePassword,
  getRegisterPageSecondaryPassword,
  getRegisterPageUsername,
} from "./Selectors";
import { IRegisterPageState } from "./Types";

const UPDATE_REGISTER_PAGE = "RegisterPage/Update";

export const setRegisterPageState = createAction(UPDATE_REGISTER_PAGE, (props: Partial<IRegisterPageState>) => ({
  payload: props,
}));

export const initRegisterPageState = () => (dispatch: IAppDispatch) => {
  dispatch(
    setRegisterPageState({
      password: "",
      secondaryPassword: "",
      code: "",
      uError: null,
      pError: null,
      spError: null,
      eError: null,
      cError: null,
      sError: null,
      loading: false,
    }),
  );
};

const validateAction = () => (dispatch: IAppDispatch, getState: () => IRootState) => {
  const state = getState();

  let succeed = true;
  const ls = getLocalizedStrings(state);

  // 1. Validate username
  const username = getRegisterPageUsername(state);
  if (!username) {
    succeed = false;
    dispatch(
      setRegisterPageState({
        uError: ls.LS_COMMON_EMPTY_FIELD_ERROR_MESSAGE,
      }),
    );
  } else if (!isUsername(username)) {
    succeed = false;
    setRegisterPageState({
      uError: ls.LS_COMMON_INVALID_USERNAME_ERROR_MESSAGE,
    });
  }

  // 2. Validate email
  const email = getRegisterPageEmail(state);
  if (!email) {
    succeed = false;
    dispatch(setRegisterPageState({ eError: ls.LS_COMMON_EMPTY_FIELD_ERROR_MESSAGE }));
  } else if (!isEmail(email)) {
    succeed = false;
    dispatch(setRegisterPageState({ eError: ls.LS_COMMON_INVALID_EMAIL_ADDRESS_ERROR_MESSAGE }));
  }

  // 3. Validate password
  const password = getRegisterPagePassword(state);
  if (!password) {
    succeed = false;
    dispatch(setRegisterPageState({ pError: ls.LS_COMMON_EMPTY_FIELD_ERROR_MESSAGE }));
  } else if (password.length < 6 || password.length > 32) {
    succeed = false;
    dispatch(setRegisterPageState({ pError: ls.LS_COMMON_INVALID_PASSWORD_ERROR_MESSAGE }));
  }
  const secondaryPassword = getRegisterPageSecondaryPassword(state);
  if (!secondaryPassword) {
    succeed = false;
    dispatch(setRegisterPageState({ spError: ls.LS_COMMON_EMPTY_FIELD_ERROR_MESSAGE }));
  } else if (password !== secondaryPassword) {
    succeed = false;
    dispatch(setRegisterPageState({ spError: ls.LS_COMMON_PASSWORD_NOT_SAME_ERROR_MESSAGE }));
  }

  // 4. Validate email verification code
  if (getRequireEmailVerification(state)) {
    const code = getRegisterPageCode(state);
    if (!code) {
      succeed = false;
      dispatch(setRegisterPageState({ cError: ls.LS_COMMON_EMPTY_FIELD_ERROR_MESSAGE }));
    }
  }

  return succeed;
};

export const registerAction =
  (recaptcha: RecaptchaType) => async (dispatch: IAppDispatch, getState: () => IRootState) => {
    if (!dispatch(validateAction())) return false;
    const state = getState();
    if (getHasError(state)) return false;
    const ls = getLocalizedStrings(state);

    dispatch(setRegisterPageState({ loading: true }));

    const { data, error } = await postRegisterRequestAsync(
      {
        username: getRegisterPageUsername(state),
        email: getRegisterPageEmail(state),
        password: getRegisterPagePassword(state),
        ...(getRequireEmailVerification(state) && {
          emailVerificationCode: getRegisterPageCode(state),
        }),
      },
      await recaptcha(CE_RecaptchaAction.Register),
    );

    if (error) {
      if (error.code === CE_ErrorCode.Auth_DuplicateUsername) {
        dispatch(setRegisterPageState({ uError: ls.LS_COMMON_DUPLICATE_USERNAME_ERROR_MESSAGE }));
      } else if (error.code === CE_ErrorCode.Auth_DuplicateEmail) {
        dispatch(setRegisterPageState({ eError: ls.LS_COMMON_DUPLICATE_EMAIL_ERROR_MESSAGE }));
      } else if (error.code === CE_ErrorCode.Auth_InvalidEmailVerificationCode) {
        dispatch(setRegisterPageState({ cError: ls.LS_COMMON_INVALID_VER_CODE_ERROR_MESSAGE }));
      }
      dispatch(setRegisterPageState({ loading: false }));
      return false;
    } else {
      dispatch(
        setRegisterPageState({
          loading: false,
          username: "",
          email: "",
          password: "",
          secondaryPassword: "",
          code: "",
          sendCodeTime: 0,
        }),
      );
      dispatch(setEnvApiBearerToken(data.token));
      dispatch(setCurrentUser(data.userBaseDetail));
      dispatch(setEnv(data.userPreference));
      await dispatch(initUserPreferenceConfigAsync);
      return true;
    }
  };

export const checkUsernameAction =
  (recaptcha: RecaptchaType) => async (dispatch: IAppDispatch, getState: () => IRootState) => {
    const state = getState();
    const ls = getLocalizedStrings(state);
    const username = getRegisterPageUsername(state);

    if (!username) {
      dispatch(setRegisterPageState({ uError: ls.LS_COMMON_EMPTY_FIELD_ERROR_MESSAGE }));
    } else if (!isUsername(username)) {
      dispatch(setRegisterPageState({ uError: ls.LS_COMMON_INVALID_USERNAME_ERROR_MESSAGE }));
    } else {
      const { data } = await getCheckUsernameRequestAsync(username, await recaptcha(CE_RecaptchaAction.CheckUsername));
      if (data && !data.available) {
        dispatch(setRegisterPageState({ uError: ls.LS_COMMON_DUPLICATE_USERNAME_ERROR_MESSAGE }));
      } else {
        dispatch(setRegisterPageState({ uError: "" }));
      }
    }
  };

export const sendEmailEmailVerificationCodeAction =
  (recaptcha: RecaptchaType) => async (dispatch: IAppDispatch, getState: () => IRootState) => {
    const state = getState();
    const ls = getLocalizedStrings(state);
    const lang = getLanguage(state);
    const email = getRegisterPageEmail(state);

    if (!email) {
      dispatch(setRegisterPageState({ eError: ls.LS_COMMON_EMPTY_FIELD_ERROR_MESSAGE }));
      return false;
    } else if (!isEmail(email)) {
      dispatch(setRegisterPageState({ eError: ls.LS_COMMON_INVALID_EMAIL_ADDRESS_ERROR_MESSAGE }));
      return false;
    }

    const { error } = await postSendRegisterEmailVerificationCodeRequestAsync(
      email,
      lang,
      await recaptcha(CE_RecaptchaAction.SendEmailVerificationCode),
    );

    if (error) {
      if (error.code === CE_ErrorCode.Auth_DuplicateEmail) {
        dispatch(setRegisterPageState({ eError: ls.LS_COMMON_DUPLICATE_EMAIL_ERROR_MESSAGE }));
      } else if (error.code === CE_ErrorCode.Auth_EmailVerificationCodeRateLimited) {
        dispatch(
          setRegisterPageState({ sError: ls.LS_COMMON_VER_CODE_RATE_LIMIT_ERROR_MESSAGE, sendCodeTime: Date.now() }),
        );
      }
      return false;
    }

    dispatch(setRegisterPageState({ sendCodeTime: Date.now() }));
    return true;
  };
