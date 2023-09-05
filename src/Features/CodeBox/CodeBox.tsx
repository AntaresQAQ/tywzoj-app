import { Spinner, SpinnerSize } from "@fluentui/react";
import * as React from "react";

import { CE_ThemeName } from "@/Common/Theme";
import { combineAttributes } from "@/Common/Utilities/Attributes";
import { PromiseInnerType } from "@/Common/Utilities/Types";
import { getThemeName } from "@/Features/Environment/Selectors";
import { loadHighlighter } from "@/Features/Highlight/DynamicImport";
import { useAppSelector } from "@/Features/Store";

export interface ICodeBoxProps {
    code: string;
    lang?: string;
    className?: string;
}

let highlighterModule: PromiseInnerType<ReturnType<typeof loadHighlighter>>;

export const CodeBox: React.FC<ICodeBoxProps> = props => {
    const { code, lang = "plaintext", className } = props;

    const themeName = useAppSelector(getThemeName);

    const [html, setHtml] = React.useState("");
    const [pending, setPending] = React.useState(false);
    React.useEffect(() => {
        setPending(true);
        renderAsync(code, lang, themeName)
            .then(h => setHtml(h))
            .finally(() => setPending(false));
    }, [code, lang, themeName]);

    return pending ? (
        <Spinner size={SpinnerSize.large} />
    ) : (
        <pre className={combineAttributes(`language-${lang}`, className)}>
            <code className={`language-${lang}`} dangerouslySetInnerHTML={{ __html: html }} />
        </pre>
    );
};

async function renderAsync(code: string, lang: string, themeName: CE_ThemeName) {
    const { highlighter } = highlighterModule ?? (highlighterModule = await loadHighlighter());
    return highlighter(code, lang, themeName);
}

export default CodeBox;
