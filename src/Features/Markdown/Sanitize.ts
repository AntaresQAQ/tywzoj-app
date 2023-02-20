import { escapeAttrValue, FilterXSS } from "xss";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getDefaultWhiteList } from "xss/lib/default";

const whiteList = getDefaultWhiteList() as unknown as XSS.IWhiteList;

delete whiteList.audio;
delete whiteList.video;

// Allow "style" and "class" attributes
Object.keys(whiteList).forEach(tag => {
  whiteList[tag].push("style", "class");
});

// The "data-id" attribute is used for highlight and math rendering
whiteList.span.push("data-id");

function originalAttrValue(name: string, value: string) {
  return name + '="' + escapeAttrValue(value) + '"';
}

export function sanitize(
  html: string,
  onTagAttr?: (
    tagName: string,
    attrName: string,
    value: string,
    escapeAttrValue: (value: string) => string,
  ) => boolean | string | void,
) {
  const xss = new FilterXSS({
    whiteList: whiteList,
    stripIgnoreTag: true,
    onTagAttr: (tag, name, value) => {
      if (onTagAttr) {
        const result = onTagAttr(tag, name, value, escapeAttrValue);
        if (typeof result === "string") return result;
        else if (result === true) return originalAttrValue(name, value);
      }

      // Allow data URIs for <img>
      if (tag.toLowerCase() === "img" && name.toLowerCase() === "src" && value.startsWith("data:image/")) {
        return originalAttrValue(name, value);
      }
    },
  });

  const filteredHtml = xss.process(html);
  if (!filteredHtml) return "";

  return filteredHtml;
}
