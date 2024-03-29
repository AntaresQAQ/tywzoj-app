import { CE_Language, defaultLanguage, rtlLanguages, supportedLanguages } from "./Locales";

export function getIsRtlLanguage(lang: CE_Language) {
    return rtlLanguages.findIndex(l => lang.startsWith(l)) >= 0;
}

export function chooseLanguage(languages: string | string[]): CE_Language {
    if (!languages) return null;

    const f = (langs: string[]) => {
        for (const lang of langs) {
            const idx = supportedLanguages.findIndex(value => value === lang);
            if (idx >= 0) return supportedLanguages[idx];
        }
        return null;
    };

    if (typeof languages === "string") languages = [languages];
    languages = languages.map(lang => lang.trim().toLowerCase());

    return f(languages) || f(languages.map(lang => lang.split("-")[0])) || null;
}

export function getNavigatorLanguage() {
    return chooseLanguage(Array.from(navigator.languages));
}

export function getPreferLanguage() {
    return getNavigatorLanguage() || defaultLanguage;
}

export function loadLocaleAsync(lang: CE_Language) {
    return import(`../../assets/locale/${lang}.json`).then(module => module.default as ILocalizedString);
}
