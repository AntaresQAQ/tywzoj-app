import { CE_ThemeName } from "@/Common/Theme";
import { getBaseUrl } from "@/Features/Environment/Settings/BuildEnv";
import { getClientVersion } from "@/Features/Environment/Settings/BuildInfo";

let currentTheme: CE_ThemeName; // Cache current theme to avoid duplicate inject

const stylesLink = {
    [CE_ThemeName.Light]: `prism-one-light`,
    [CE_ThemeName.Dark]: `prism-dracula`,
    [CE_ThemeName.HighContrast]: `prism-atom-dark`,
};

export const injectStyles = (themeName: CE_ThemeName) => {
    if (themeName === currentTheme) return;

    let el = document.getElementById("prism-css") as HTMLLinkElement;
    if (!el) {
        el = document.createElement("link");
        el.id = "prism-css";
        el.rel = "stylesheet";
        document.head.appendChild(el);
    }
    el.href = `${getBaseUrl()}styles/${stylesLink[themeName]}.css?v=${getClientVersion().hash}`;
    // add version query for cdn
    currentTheme = themeName;
};
