import "katex/dist/katex.min.css";

import { PromiseInnerType } from "@/Common/Utilities/Types";

import { loadKatex } from "./DynamicImport";

let katexModule: PromiseInnerType<ReturnType<typeof loadKatex>>;

export async function renderMathAsync(math: string, display: boolean) {
  const { default: katex } = katexModule ?? (katexModule = await loadKatex());

  return katex.renderToString(math, {
    throwOnError: false,
    displayMode: display,
  });
}
