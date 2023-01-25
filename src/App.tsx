import { FluentProvider } from "@fluentui/react-components";
import * as React from "react";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";

import { getSiteName, getThemeName } from "@/Common/Environment/Selectors";
import { AppLayout } from "@/Common/Layout/Layout";
import { getTheme } from "@/Common/Theme";
import i18n from "@/i18n";
import { AppRoutes } from "@/Router/Routes";
import { useAppSelector } from "@/Store";

export const App: React.FC = () => {
  const themeName = useAppSelector(getThemeName);
  const siteName = useAppSelector(getSiteName);

  React.useEffect(() => {
    document.title = siteName;
  }, [siteName]);

  return (
    <FluentProvider theme={getTheme(themeName)}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <AppLayout>
            <AppRoutes />
          </AppLayout>
        </BrowserRouter>
      </I18nextProvider>
    </FluentProvider>
  );
};
