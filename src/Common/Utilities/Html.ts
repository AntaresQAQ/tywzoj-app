export function escapeHtml(text: string) {
    text = text.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;").split(" ").join("&nbsp;");
    return text;
}
