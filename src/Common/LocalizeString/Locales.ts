export const enum CE_Language {
  ar = "ar",
  en = "en",
  fr = "fr",
  ja = "ja",
  ko = "ko",
  zh_cn = "zh-cn",
  zh_hk = "zh-hk",
}

export const defaultLanguage = CE_Language.zh_cn;

export const supportedLanguages: CE_Language[] = [
  // CE_Language.ar,
  CE_Language.en,
  // CE_Language.fr,
  // CE_Language.ja,
  // CE_Language.ko,
  CE_Language.zh_cn,
  // CE_Language.zh_hk,
];

export const languageStorageStringKey = "language";

export const rtlLanguages = [
  "ar", // Arabic
  "az", // Azerbaijani
  "dv", // Divehi
  "fa", // Persian
  "ff", // Fulah
  "he", // Hebrew
  "ku", // Central Kurdish
  "nqo", // N'ko
  "syr", // Syriac
  "ug", // Uyghur
  "ur", // Urdu
];

export const fluentUILanguageMap = {
  [CE_Language.ar]: "ar",
  [CE_Language.en]: "en",
  [CE_Language.fr]: "fr",
  [CE_Language.ja]: "ja-JP",
  [CE_Language.ko]: "ko-KR",
  [CE_Language.zh_cn]: "ch-ZHS",
  [CE_Language.zh_hk]: "ch-ZHT",
};
