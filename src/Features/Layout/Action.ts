import { postLogoutRequestAsync } from "@/Common/Request/Common";
import { initUserPreference } from "@/Features/Environment";
import { setCurrentUser, setEnvApiBearerToken } from "@/Features/Environment/Action";
import { initUserPreferenceConfigAsync } from "@/Features/Initialization";
import { IAppDispatch } from "@/Features/Store";

export const logoutAction = () => async (dispatch: IAppDispatch) => {
  await postLogoutRequestAsync();
  dispatch(setEnvApiBearerToken(null));
  dispatch(setCurrentUser(null));
  dispatch(initUserPreference);
  await dispatch(initUserPreferenceConfigAsync);
};
