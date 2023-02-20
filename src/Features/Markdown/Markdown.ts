/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import * as MarkdownIt from "markdown-it";
import * as MarkdownItMath from "markdown-it-math-loose";
import * as MarkdownItMergeCells from "markdown-it-merge-cells/src";
import { v4 as uuidV4 } from "uuid";

export interface IMarkdownHighlightPlaceholder {
  id: string;
  code: string;
  lang: string;
}

export interface IMarkdownMathPlaceholder {
  id: string;
  math: string;
  display: boolean;
}

export interface IRenderMarkdownReturnType {
  htmlString: string;
  highlightPlaceholders: IMarkdownHighlightPlaceholder[];
  mathPlaceholders: IMarkdownMathPlaceholder[];
}

// Use a <span> placeholder for highlights and maths
// They're replaced after HTML sanitation
function generatePlaceholder(id: string) {
  return `<span data-id="${id}"></span>`;
}

export function findPlaceholderElement(wrapperElement: HTMLElement, id: string): HTMLSpanElement {
  return wrapperElement.querySelector(`[data-id="${id}"]`);
}

export function renderMarkdown(
  content: string,
  onPatchRenderer?: (renderer: MarkdownIt) => void,
): IRenderMarkdownReturnType {
  const highlightPlaceholders: IMarkdownHighlightPlaceholder[] = [];
  const mathPlaceholders: IMarkdownMathPlaceholder[] = [];

  const renderer = new MarkdownIt({
    html: true,
    breaks: false,
    linkify: true,
    typographer: true,
    highlight: (code, lang) => {
      const id = uuidV4();
      highlightPlaceholders.push({
        id,
        code,
        lang,
      });
      const cls = `language-${lang}`;

      return `<pre class="${cls}"><code class="${cls}">${generatePlaceholder(id)}</code></pre>`;
    },
  });

  renderer.use(MarkdownItMath, {
    inlineOpen: "$",
    inlineClose: "$",
    blockOpen: "$$",
    blockClose: "$$",
    inlineRenderer: (math: string) => {
      const id = uuidV4();
      mathPlaceholders.push({
        id,
        math,
        display: false,
      });

      return generatePlaceholder(id);
    },
    blockRenderer: (math: string) => {
      const id = uuidV4();
      mathPlaceholders.push({
        id,
        math,
        display: true,
      });

      return generatePlaceholder(id);
    },
  });

  renderer.use(MarkdownItMergeCells);

  onPatchRenderer && onPatchRenderer(renderer);

  return {
    htmlString: renderer.render(content),
    highlightPlaceholders,
    mathPlaceholders,
  };
}
