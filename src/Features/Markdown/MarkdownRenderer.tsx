import { Spinner, SpinnerSize, useTheme } from "@fluentui/react";
import type * as MarkdownIt from "markdown-it";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { CE_ThemeName } from "@/Common/Theme";
import { combineAttributes } from "@/Common/Utilities/Attributes";
import { PromiseInnerType } from "@/Common/Utilities/Types";
import { parseUrlIfSameOrigin } from "@/Common/Utilities/Url";
import { getThemeName } from "@/Features/Environment/Selectors";
import { loadHighlighter } from "@/Features/Highlight/DynamicImport";
import { useAppSelector } from "@/Features/Store";

import { loadMathRenderer } from "./DynamicImport";
import { findPlaceholderElement, renderMarkdown } from "./Markdown";
import { sanitize } from "./Sanitize";
import { getMarkdownContentStyles } from "./Styles";

export interface IMarkdownContentPatcher {
    onPatchRenderer?: (renderer: MarkdownIt) => void;
    onPatchResult?: (element: HTMLDivElement) => (() => void) | void;
    onXssFilterAttr?: (
        tagName: string,
        attrName: string,
        value: string,
        escapeAttrValue: (value: string) => string,
    ) => string | boolean | void;
}
export interface IMarkdownRendererProps {
    content: string;
    className?: string;
    noSanitize?: boolean;
    patcher?: IMarkdownContentPatcher;
}

export const MarkdownRenderer: React.FC<IMarkdownRendererProps> = props => {
    const { content = "", className, noSanitize = false, patcher = {} } = props;

    const navigate = useNavigate();
    const themeName = useAppSelector(getThemeName);
    const theme = useTheme();
    const cls = getMarkdownContentStyles(theme);

    const [wrapperElement, setWrapperElement] = React.useState<HTMLDivElement>();
    const [html, setHtml] = React.useState("");
    const [pending, setPending] = React.useState(false);

    // 1. Set pending and rendering.
    // 2. Unset pending and update html after rendering.
    React.useEffect(() => {
        setPending(true);
        renderAsync(content, noSanitize, patcher, themeName)
            .then(h => setHtml(h))
            .finally(() => setPending(false));
    }, [content, noSanitize, patcher, themeName]);

    // 3. This will be triggered after html updated.
    React.useEffect(() => {
        if (!wrapperElement) return;

        const cleanCallbacks: ((() => void) | void)[] = [];

        // Fix internal links with dynamic generated `<a>` will NOT trigger react-router's navigation
        function onLinkClick(e: MouseEvent) {
            const targetElement = e.target as HTMLElement;
            if (targetElement.tagName === "A") {
                const a = targetElement as HTMLAnchorElement;
                if (!["", "_self"].includes(a.target.toLowerCase())) return;

                const url = parseUrlIfSameOrigin(a.href);
                if (url) {
                    e.preventDefault();
                    navigate(url.pathname + url.search + url.hash);
                }
            }
        }

        wrapperElement.addEventListener("click", onLinkClick);
        cleanCallbacks.push(() => wrapperElement.removeEventListener("click", onLinkClick));

        // Call patcher
        const { onPatchResult } = patcher;
        if (onPatchResult && wrapperElement) cleanCallbacks.push(onPatchResult(wrapperElement));

        return () => cleanCallbacks.forEach(fn => fn && fn());
    }, [navigate, patcher, wrapperElement]);

    return pending ? (
        <Spinner size={SpinnerSize.large} />
    ) : (
        <div
            className={combineAttributes(cls, className)}
            dangerouslySetInnerHTML={{ __html: html }}
            ref={setWrapperElement}
        />
    );
};

let highlighterModule: PromiseInnerType<ReturnType<typeof loadHighlighter>>;
let mathRendererModule: PromiseInnerType<ReturnType<typeof loadMathRenderer>>;

async function renderAsync(
    content: string,
    noSanitize: boolean,
    patcher: IMarkdownContentPatcher,
    themeName: CE_ThemeName,
) {
    const { onPatchRenderer, onXssFilterAttr } = patcher;

    const { htmlString, highlightPlaceholders, mathPlaceholders } = renderMarkdown(content, onPatchRenderer);
    // const htmlString = content;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = noSanitize ? htmlString : sanitize(htmlString, onXssFilterAttr);

    if (highlightPlaceholders.length > 0) {
        const { highlighter } = highlighterModule ?? (highlighterModule = await loadHighlighter());

        for (const placeholder of highlightPlaceholders) {
            const element = findPlaceholderElement(wrapper, placeholder.id);
            element.outerHTML = highlighter(placeholder.code, placeholder.lang, themeName);
        }
    }

    if (mathPlaceholders.length > 0) {
        const { renderMathAsync } = mathRendererModule ?? (mathRendererModule = await loadMathRenderer());

        for (const placeholder of mathPlaceholders) {
            const element = findPlaceholderElement(wrapper, placeholder.id);
            element.outerHTML = await renderMathAsync(placeholder.math, placeholder.display);
        }
    }

    // Patch <a> tags for security reason
    Array.from(wrapper.getElementsByTagName("a")).forEach(a => {
        a.relList.add("noreferrer", "noreferrer");
        if (!parseUrlIfSameOrigin(a.href)) a.target = "_blank";
    });

    return wrapper.innerHTML;
}

export default MarkdownRenderer;
