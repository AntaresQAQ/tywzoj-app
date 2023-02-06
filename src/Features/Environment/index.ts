import { CE_TokenName, getToken } from "@/Common/Utilities/Token";
import { IAppDispatch } from "@/Features/Store";

import { setClientVersion, setEnv } from "./Action";
import { getApiEndPoint } from "./Settings/BuildEnv";
import { getClientVersion } from "./Settings/BuildInfo";
import {
  isAndroid,
  isChrome,
  isEdge,
  isFireFox,
  isIOS,
  isMiddleScreen,
  isMiniScreen,
  isMobile,
  isMobileView,
  isSafari,
  isSmallScreen,
} from "./Settings/UserAgent";

export function initEnv(dispatch: IAppDispatch) {
  dispatch(
    setEnv({
      apiBearerToken: getToken(CE_TokenName.ApiBearerToken),
      apiEndPoint: getApiEndPoint(),
      isMobile: isMobile(),
      isMiniScreen: isMiniScreen(),
      isSmallScreen: isSmallScreen(),
      isMiddleScreen: isMiddleScreen(),
      isMobileView: isMobileView(),
      isAndroid: isAndroid(),
      isIOS: isIOS(),
      isChrome: isChrome(),
      isEdge: isEdge(),
      isFirefox: isFireFox(),
      isSafari: isSafari(),
    }),
  );
  dispatch(setClientVersion(getClientVersion()));
  dispatch(bindWindowListener);
}

function bindWindowListener(dispatch: IAppDispatch) {
  window.addEventListener("resize", () =>
    dispatch(
      setEnv({
        isMobile: isMobile(),
        isMiniScreen: isMiniScreen(),
        isSmallScreen: isSmallScreen(),
        isMiddleScreen: isMiddleScreen(),
        isMobileView: isMobileView(),
      }),
    ),
  );
}
