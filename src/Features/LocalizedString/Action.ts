import { createAction } from "@reduxjs/toolkit";

import { setEnv } from "@/Features/Environment/Action";
import { IAppDispatch } from "@/Features/Store";

import { CE_Language } from "./Locales";
import { ILocaleState } from "./Types";
import { getIsRtlLanguage, loadLocaleAsync } from "./Utils";

const UPDATE_LOCALE = "Locale/Update";
export const setLocale = createAction(UPDATE_LOCALE, (props: Partial<ILocaleState>) => ({
    payload: props,
}));

export const updateLocaleAction = (lang: CE_Language) => async (dispatch: IAppDispatch) => {
    const strings = await loadLocaleAsync(lang);
    dispatch(
        setLocale({
            lang: lang,
            strings: strings,
        }),
    );
    dispatch(setEnv({ isRtl: getIsRtlLanguage(lang) }));
};
