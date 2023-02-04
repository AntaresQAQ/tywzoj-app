import { ThemeProvider } from "@fluentui/react";
import * as React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { BrowserRouter } from "react-router-dom";

import { getIsRtl, getPageName, getRecaptchaKey, getSiteName, getThemeName } from "@/Common/Environment/Selectors";
import { AppErrorBoundary } from "@/Common/Error/ErrorBoundary";
import { AppLayout } from "@/Common/Layout/Layout";
import { fluentUILanguageMap, recaptchaLanguageMap } from "@/Common/LocalizedString/Locales";
import { getLanguage } from "@/Common/LocalizedString/Selectors";
import { getTheme } from "@/Common/Theme";
import { RouterStateWatcher } from "@/Router/RouterStateWatcher";
import { AppRoutes } from "@/Router/Routes";
import { useAppSelector } from "@/Store";

export const App: React.FC = () => {
  const themeName = useAppSelector(getThemeName);
  const siteName = useAppSelector(getSiteName);
  const pageName = useAppSelector(getPageName);
  const lang = useAppSelector(getLanguage);
  const isRtl = useAppSelector(getIsRtl);
  const recaptchaEnabled = useAppSelector(state => state.env.recaptchaEnabled);
  const useRecaptchaNet = useAppSelector(state => state.env.useRecaptchaNet);
  const recaptchaKey = useAppSelector(getRecaptchaKey);

  React.useEffect(() => {
    document.title = pageName ? `${pageName} - ${siteName}` : siteName;
  }, [pageName, siteName]);

  React.useEffect(() => {
    document.documentElement.dir = document.body.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = fluentUILanguageMap[lang];
  }, [isRtl, lang]);

  const innerElements = React.useMemo(
    () => (
      <ThemeProvider theme={getTheme(themeName)} style={{ height: "100%" }} dir={isRtl ? "rtl" : "ltr"}>
        <BrowserRouter>
          <RouterStateWatcher>
            <AppLayout>
              <AppErrorBoundary>
                <AppRoutes />
              </AppErrorBoundary>
            </AppLayout>
          </RouterStateWatcher>
        </BrowserRouter>
      </ThemeProvider>
    ),
    [isRtl, themeName],
  );

  return recaptchaEnabled ? (
    <GoogleReCaptchaProvider
      reCaptchaKey={recaptchaKey}
      useRecaptchaNet={useRecaptchaNet}
      language={recaptchaLanguageMap[lang]}
    >
      {innerElements}
    </GoogleReCaptchaProvider>
  ) : (
    innerElements
  );
};
