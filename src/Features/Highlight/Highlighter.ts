import { highlight, languages } from "prismjs";

import { CE_ThemeName } from "@/Common/Theme";
import { escapeHtml } from "@/Common/Utilities/Html";

import { injectStyles } from "./Styles";

function normalizeLanguageName(language: string) {
    return language.trim().toLowerCase();
}

function normalizeCode(code: string) {
    return code.split("\r").join("");
}

export function highlighter(code: string, lang: string, themeName: CE_ThemeName) {
    code = normalizeCode(code);
    lang = normalizeLanguageName(lang);
    injectStyles(themeName);
    if (lang && languages[lang]) {
        try {
            return highlight(code, languages[lang], lang);
        } catch (e) {
            console.error(`Failed to highlight, language = ${lang}`, e);
        }
    }
    return escapeHtml(code).split("\n").join("<br>");
}
