import { initializeIcons } from "@fluentui/react";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { initEnv } from "@/Common/Environment";
import { setCurrentUser, setEnv, setPagination, setServerVersion } from "@/Common/Environment/Action";
import { getApiBearerToken } from "@/Common/Environment/Selectors";
import { ErrorBoundary } from "@/Common/Error/ErrorBoundary";
import { setLocale } from "@/Common/LocalizedString/Action";
import { getIsRtlLanguage, getPreferLanguage, loadLocaleAsync } from "@/Common/LocalizedString/Utils";
import { getSessionInfoRequestAsync } from "@/Common/Request/Common";

import { App } from "./App";
import { store } from "./Store";

function render() {
  createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <App />
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>,
  );
}

function initSessionInfoAsync() {
  const token = getApiBearerToken(store.getState());
  return getSessionInfoRequestAsync(token).then(sessionInfo => {
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
    }
  });
}

function initLocalizeStringAsync() {
  const preferLang = getPreferLanguage();
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
  initializeIcons();
  store.dispatch(initEnv);
  Promise.all([initSessionInfoAsync(), initLocalizeStringAsync()]).then(render);
}

launch();
