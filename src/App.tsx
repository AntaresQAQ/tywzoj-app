import { ThemeProvider } from "@fluentui/react";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import { getIsRtl, getSiteName, getThemeName } from "@/Common/Environment/Selectors";
import { AppLayout } from "@/Common/Layout/Layout";
import { fluentUILanguageMap } from "@/Common/LocalizedString/Locales";
import { getLanguage } from "@/Common/LocalizedString/Selectors";
import { getTheme } from "@/Common/Theme";
import { AppRoutes } from "@/Router/Routes";
import { useAppSelector } from "@/Store";

export const App: React.FC = () => {
  const themeName = useAppSelector(getThemeName);
  const siteName = useAppSelector(getSiteName);
  const lang = useAppSelector(getLanguage);
  const isRtl = useAppSelector(getIsRtl);

  React.useEffect(() => {
    document.title = siteName;
  }, [siteName]);

  React.useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = fluentUILanguageMap[lang];
  }, [isRtl, lang]);

  return (
    <ThemeProvider theme={getTheme(themeName)} style={{ height: "100%" }}>
      <BrowserRouter>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
};
