export function loadMarkdownRenderer() {
  return import("./MarkdownRenderer");
}

export function loadMathRenderer() {
  return import("./MathRenderer");
}

export function loadKatex() {
  return import("katex");
}
