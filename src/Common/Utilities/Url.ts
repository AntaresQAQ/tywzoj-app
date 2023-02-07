import { IQueryObj, toQueryString } from "@/Common/Utilities/QueryString";
import { XOR } from "@/Common/Utilities/Types";

import { CE_PagePath } from "../Enums/PagePath";

type IMakeUrlProps = XOR<{ origin?: string }, { base?: CE_PagePath }> & {
  path?: string;
  queries?: IQueryObj;
  hash?: string;
};
export function makeUrl(props: IMakeUrlProps) {
  const { origin, base, path, queries, hash } = props;
  let url = "";

  if (origin) {
    url += `${location.protocol}//${origin}`;
  } else if (base) {
    url += base;
  }

  if (path) {
    if (!path.startsWith("/") && !url.endsWith("/")) url += "/";
    url += path
      .split("/")
      .map(x => encodeURIComponent(x.trim()))
      .join("/");
  }

  if (queries) {
    if (!url.endsWith("?")) url += "?";
    url += toQueryString(queries);
  }

  if (hash) {
    url += `#${encodeURIComponent(hash.startsWith("#") ? hash.substring(1) : hash)}`;
  }

  return url;
}

export function makeEmailUrl(address: string) {
  return `mailto:${address}`;
}
