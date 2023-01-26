import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { getSessionInfoRequestAsync } from "@/Api/Modules/Auth";
import { setCurrentUser, setEnv, setPagination, setServerVersion } from "@/Common/Environment/Action";
import { getApiBearerToken } from "@/Common/Environment/Selectors";
import { ErrorBoundary } from "@/Common/Error/ErrorBoundary";
import { setLocale } from "@/Common/LocalizeString/Action";
import { getPreferLanguage, loadLocaleAsync } from "@/Common/LocalizeString/Utils";

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
  });
}

function launch() {
  Promise.all([initSessionInfoAsync(), initLocalizeStringAsync()]).then(render);
}

launch();
