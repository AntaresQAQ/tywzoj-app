import { CE_Language } from "@/Common/LocalizedString/Locales";

export type ILocalizedNamespace = keyof ILocalizedString;

export interface ILocaleState {
  lang: CE_Language;
  strings: ILocalizedString;
}
