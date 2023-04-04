import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { initEnv } from "./Features/Environment";
import { GlobalErrorBoundary } from "./Features/Error/ErrorBoundary";
import { initSessionInfoAsync, initUserPreferenceConfigAsync } from "./Features/Initialization";
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

function launch() {
  store.dispatch(initEnv);
  store.dispatch(initSessionInfoAsync).then(() => {
    store.dispatch(initUserPreferenceConfigAsync).then(() => {
      render();
    });
  });
}

launch();
