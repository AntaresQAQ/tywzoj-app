import { CE_TokenName, getToken } from "@/Common/Utilities/Token";
import { IAppDispatch } from "@/Store";

import { setEnv } from "./Action";
import {
  isAndroid,
  isChrome,
  isEdge,
  isFireFox,
  isIOS,
  isMiddleScreen,
  isMiniScreen,
  isMobile,
  isSafari,
  isSmallScreen,
} from "./Settings/UserAgent";

export function initEnv(dispatch: IAppDispatch) {
  dispatch(
    setEnv({
      apiBearerToken: getToken(CE_TokenName.ApiBearerToken),
      isMobile: isMobile(),
      isMiniScreen: isMiniScreen(),
      isSmallScreen: isSmallScreen(),
      isMiddleScreen: isMiddleScreen(),
      isAndroid: isAndroid(),
      isIOS: isIOS(),
      isChrome: isChrome(),
      isEdge: isEdge(),
      isFirefox: isFireFox(),
      isSafari: isSafari(),
    }),
  );
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
      }),
    ),
  );
}
