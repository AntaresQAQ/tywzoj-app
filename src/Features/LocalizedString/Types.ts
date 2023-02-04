import { CE_Language } from "@/Features/LocalizedString/Locales";

export type ILocalizedNamespace = keyof ILocalizedString;

export interface ILocaleState {
  lang: CE_Language;
  strings: ILocalizedString;
}
