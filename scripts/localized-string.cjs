const path = require("path");
const yaml = require("js-yaml");
const fs = require("fs");

const supportedLanguages = [
    // "ar",
    "en",
    // "fr",
    // "ko",
    "zh-cn",
    // "zh-hk"
];
const defaultLanguage = "en";

const localeDir = path.join(__dirname, "..", "localized-strings");
const staticDir = path.join(__dirname, "..", "src", "assets", "locale");
const typesFilePath = path.join(__dirname, "..", "src", "Features", "LocalizedString", "locale.d.ts");
const defaultLanguageFilePath = path.join(localeDir, "localized-string.yaml");
const defaultLanguageYaml = yaml.load(fs.readFileSync(defaultLanguageFilePath).toString());

function loadLanguageYaml(lang) {
    const obj = {};
    const filePath = path.join(localeDir, `localized-string.${lang}.yaml`);
    if (fs.existsSync(filePath)) {
        const arr = yaml.load(fs.readFileSync(filePath).toString()) || [];
        arr.forEach(item => {
            obj[item.name] = item;
        });
    }
    return obj;
}

function saveLanguageYaml(lang, obj) {
    const arr = Object.values(obj);
    arr.sort((a, b) => a.index - b.index);
    arr.forEach(x => delete x.index);

    const filePath = path.join(localeDir, `localized-string.${lang}.yaml`);
    fs.writeFileSync(filePath, yaml.dump(arr).replaceAll("\n-", "\n\n-"));
}

function generateLanguageYamlFiles() {
    supportedLanguages.forEach(lang => {
        const languageYaml = loadLanguageYaml(lang);
        const obj = {};
        defaultLanguageYaml.forEach((item, index) => {
            if (languageYaml[item.name]?.value && languageYaml[item.name].raw === item.value) {
                obj[item.name] = {
                    ...languageYaml[item.name],
                    index,
                };
            } else {
                obj[item.name] = {
                    ...item,
                    value: lang === defaultLanguage ? item.value : null,
                    raw: item.value,
                    index,
                };
            }
        });
        saveLanguageYaml(lang, obj);
    });
}

function generateTypes() {
    let content = "";
    content += "interface ILocalizedString {\n";
    Object.values(defaultLanguageYaml).forEach(item => {
        content += `// Value: ${item.value}\n`;
        content += `// Description: ${item.description}\n`;
        content += `LS_${item.name}: string\n\n`;
    });
    content += "}\n";
    fs.writeFileSync(typesFilePath, content);
}

function generateStaticFile() {
    if (fs.existsSync(staticDir)) fs.rmSync(staticDir, { recursive: true });
    fs.mkdirSync(path.join(staticDir), { recursive: true });
    supportedLanguages.forEach(lang => {
        const obj = {};
        const languageYaml = loadLanguageYaml(lang);
        Object.values(languageYaml).forEach(item => {
            obj[`LS_${item.name}`] = item.value || item.raw;
        });
        fs.writeFileSync(path.join(staticDir, `${lang}.json`), JSON.stringify(obj));
    });
}

generateTypes();
generateLanguageYamlFiles();
generateStaticFile();
