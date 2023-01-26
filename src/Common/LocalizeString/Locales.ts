export const enum CE_Language {
  en = "en",
  fr = "fr",
  ja = "ja",
  ko = "ko",
  zh_cn = "zh-cn",
  zh_hk = "zh-hk",
}

export const defaultLanguage = CE_Language.zh_cn;

export const supportedLanguages: CE_Language[] = [
  CE_Language.en,
  // CE_Language.fr,
  // CE_Language.ja,
  // CE_Language.ko,
  CE_Language.zh_cn,
  // CE_Language.zh_hk,
];

export const languageStorageStringKey = "language";
