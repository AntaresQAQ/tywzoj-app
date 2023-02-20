import { ITheme, Spinner, SpinnerSize, useTheme } from "@fluentui/react";
import type * as MarkdownIt from "markdown-it";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { useAsyncFunctionResult } from "@/Common/Hooks/Async";
import { CE_ThemeName } from "@/Common/Theme";
import { combineAttributes } from "@/Common/Utilities/Attributes";
import { PromiseInnerType } from "@/Common/Utilities/Types";
import { parseUrlIfSameOrigin } from "@/Common/Utilities/Url";
import { getCodeBoxStyle } from "@/Features/CodeBox/Styles";
import { getThemeName } from "@/Features/Environment/Selectors";
import { loadHighlighter } from "@/Features/Highlight/DynamicImport";
import { findPlaceholderElement, renderMarkdown } from "@/Features/Markdown/Markdown";
import { sanitize } from "@/Features/Markdown/Sanitize";
import { getMarkdownContentStyles } from "@/Features/Markdown/Styles";
import { useAppSelector } from "@/Features/Store";

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
  const [html, pending] = useAsyncFunctionResult(renderAsync, [content, noSanitize, patcher, theme, themeName]);

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

async function renderAsync(
  content: string,
  noSanitize: boolean,
  patcher: IMarkdownContentPatcher,
  theme: ITheme,
  themeName: CE_ThemeName,
) {
  const { onPatchRenderer, onXssFilterAttr } = patcher;

  const { htmlString, highlightPlaceholders, mathPlaceholders } = renderMarkdown(content, onPatchRenderer);
  // const htmlString = content;
  const wrapper = document.createElement("div");
  wrapper.innerHTML = noSanitize ? htmlString : sanitize(htmlString, onXssFilterAttr);

  if (highlightPlaceholders.length > 0) {
    const { highlighterAsync } = highlighterModule ?? (highlighterModule = await loadHighlighter());

    for (const placeholder of highlightPlaceholders) {
      const element = findPlaceholderElement(wrapper, placeholder.id);
      element.outerHTML = await highlighterAsync(placeholder.code, placeholder.lang, themeName);
    }
  }

  if (mathPlaceholders.length > 0) {
  }

  // Patch <a> tags for security reason
  Array.from(wrapper.getElementsByTagName("a")).forEach(a => {
    a.relList.add("noreferrer", "noreferrer");
    if (!parseUrlIfSameOrigin(a.href)) a.target = "_blank";
  });

  patchStyles(wrapper, theme);

  return wrapper.innerHTML;
}

// Patch rendered-markdown's styles for semantic-ui
function patchStyles(wrapper: HTMLDivElement, theme: ITheme) {
  // Wrap <pre> tags with segments
  Array.from(wrapper.getElementsByTagName("pre")).forEach(element => {
    // Wrap
    const segment = document.createElement("div");
    segment.className = getCodeBoxStyle(theme);
    element.parentNode.replaceChild(segment, element);
    segment.appendChild(element);
  });
}
export default MarkdownRenderer;
