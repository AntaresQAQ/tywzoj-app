import { setCurrentUser, setEnvApiBearerToken } from "@/Common/Environment/Action";
import { postLogoutRequestAsync } from "@/Common/Request/Common";
import { IAppDispatch } from "@/Store";

export const logoutAction = () => async (dispatch: IAppDispatch) => {
  await postLogoutRequestAsync();
  dispatch(setEnvApiBearerToken(null));
  dispatch(setCurrentUser(null));
};
