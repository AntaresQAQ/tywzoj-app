import { CE_ThemeName } from "@/Common/Theme";
import { escapeHtml } from "@/Common/Utilities/Html";
import { PromiseInnerType } from "@/Common/Utilities/Types";
import { loadPrism } from "@/Features/Highlight/DynamicImport";
import { injectStyles } from "@/Features/Highlight/Styles";

let prismModule: PromiseInnerType<ReturnType<typeof loadPrism>>;

function normalizeLanguageName(language: string) {
  return language.trim().toLowerCase();
}

function normalizeCode(code: string) {
  return code.split("\r").join("");
}

export async function highlighterAsync(code: string, lang: string, themeName: CE_ThemeName) {
  code = normalizeCode(code);
  lang = normalizeLanguageName(lang);
  const { highlight, languages } = prismModule ?? (prismModule = await loadPrism());
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
