import { setCurrentUser, setEnvApiBearerToken } from "@/Common/Environment/Action";
import { AppException } from "@/Common/Error/Exception";
import { postLogoutRequestAsync } from "@/Common/Request/Common";
import { IAppDispatch } from "@/Store";

export const logoutAction = () => async (dispatch: IAppDispatch) => {
  try {
    await postLogoutRequestAsync();
    dispatch(setEnvApiBearerToken(null));
    dispatch(setCurrentUser(null));
  } catch (e) {
    if (e instanceof AppException) {
    }
  }
};
