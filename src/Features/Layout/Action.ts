import { postLogoutRequestAsync } from "@/Common/Request/Common";
import { setCurrentUser, setEnvApiBearerToken } from "@/Features/Environment/Action";
import { IAppDispatch } from "@/Features/Store";

export const logoutAction = () => async (dispatch: IAppDispatch) => {
  await postLogoutRequestAsync();
  dispatch(setEnvApiBearerToken(null));
  dispatch(setCurrentUser(null));
};
