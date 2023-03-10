import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { getSessionInfoRequestAsync } from "@/Common/Request/Common";
import { initTheme } from "@/Common/Theme";
import { initEnv } from "@/Features/Environment";
import { setCurrentUser, setEnv, setPagination, setServerVersion } from "@/Features/Environment/Action";
import { getApiBearerToken } from "@/Features/Environment/Selectors";
import { GlobalErrorBoundary } from "@/Features/Error/ErrorBoundary";
import { setLocale } from "@/Features/LocalizedString/Action";
import { getIsRtlLanguage, getPreferLanguage, loadLocaleAsync } from "@/Features/LocalizedString/Utils";

import { store } from "./Features/Store";

const AppLazy = React.lazy(() => import("./App").then(({ App }) => ({ default: App })));

function render() {
  createRoot(document.getElementById("root")).render(
    <GlobalErrorBoundary>
      <Provider store={store}>
        <React.Suspense fallback={null}>
          <AppLazy />
        </React.Suspense>
      </Provider>
    </GlobalErrorBoundary>,
  );
}

function initSessionInfoAsync() {
  const token = getApiBearerToken(store.getState());
  return getSessionInfoRequestAsync(token).then(sessionInfo => {
    if (!sessionInfo) return;

    store.dispatch(
      setEnv({
        ...sessionInfo.preference.misc,
        ...sessionInfo.preference.security,
        domainIcpRecordInformation: sessionInfo.preference.domainIcpRecordInformation,
        siteName: sessionInfo.preference.siteName,
        serverTimeDiff: Date.now() - sessionInfo.unixTimestamp,
      }),
    );
    store.dispatch(
      setServerVersion({
        date: sessionInfo.serverVersion.date,
        hash: sessionInfo.serverVersion.hash,
      }),
    );
    store.dispatch(setPagination(sessionInfo.preference.pagination));
    if (sessionInfo.userBaseDetail) {
      store.dispatch(setCurrentUser(sessionInfo.userBaseDetail));
      store.dispatch(setEnv(sessionInfo.userPreference));
    }
  });
}

function initLocalizeStringAsync() {
  const preferLang = store.getState().env.userPreferLanguage || getPreferLanguage();
  return loadLocaleAsync(preferLang).then(strings => {
    store.dispatch(
      setLocale({
        lang: preferLang,
        strings: strings,
      }),
    );
    store.dispatch(setEnv({ isRtl: getIsRtlLanguage(preferLang) }));
  });
}

function launch() {
  store.dispatch(initEnv);
  initSessionInfoAsync().then(() => {
    store.dispatch(initTheme);
    initLocalizeStringAsync().then(() => {
      render();
    });
  });
}

launch();
