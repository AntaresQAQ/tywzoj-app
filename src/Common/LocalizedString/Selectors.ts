import { IRootState } from "@/Store";

export const getLanguage = (state: IRootState) => state.locale.lang;
export const getLocalizedStrings = (state: IRootState) => state.locale.strings;
