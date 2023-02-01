import { IQueryObj, toQueryString } from "@/Common/Utilities/QueryString";
import { XOR } from "@/Common/Utilities/Types";

import { CE_PagePath } from "../Enums/PagePath";

type IMakeUrlProps = XOR<{ origin?: string }, { base?: CE_PagePath }> & {
  path?: string;
  queries?: IQueryObj;
  hash?: string;
};
export function makeUrl(props: IMakeUrlProps) {
  let url = "";

  if (props.origin) {
    url += `${location.protocol}//${props.origin}`;
  } else if (props.base) {
    url += props.base;
  }

  if (props.path) {
    if (!props.path.startsWith("/") && !url.endsWith("/")) url += "/";
    url += props.path
      .split("/")
      .map(x => encodeURIComponent(x.trim()))
      .join("/");
  }

  if (props.queries) {
    url += `?${toQueryString(props.queries)}`;
  }

  if (props.hash) {
    url += `#${encodeURIComponent(props.hash)}`;
  }

  return url;
}
