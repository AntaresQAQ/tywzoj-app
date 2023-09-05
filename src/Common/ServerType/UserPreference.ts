import { CE_ThemeName } from "@/Common/Theme";
import { CE_Language } from "@/Features/LocalizedString/Locales";

export interface IUserPreferenceEntity {
    userPreferTheme: CE_ThemeName;
    userPreferLanguage: CE_Language;
    showTagsOnProblemList: boolean;
    showTagsOnProblemDetail: boolean;
}

export interface IUserPreferenceExtra {}

export type IUserPreferenceEntityWithExtra = IUserPreferenceEntity & IUserPreferenceExtra;
