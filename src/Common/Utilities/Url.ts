import { CE_Page } from "@/Common/Enums/PagePath";
import { IPageParams } from "@/Common/Types/PageParams";
import { IQueryObj, toQueryString } from "@/Common/Utilities/QueryString";
import { XOR } from "@/Common/Utilities/Types";

type IPage<T extends CE_Page> = {
  page: T;
  params?: IPageParams[T];
};

type IOrigin = {
  origin: string;
  path?: string;
  forceHttps?: boolean;
};

type IMakeUrlProps<T extends CE_Page> = XOR<IOrigin, IPage<T>> & {
  queries?: IQueryObj;
  hash?: string;
};

export function makeUrl<T extends CE_Page>(props: IMakeUrlProps<T>) {
  const { origin, forceHttps, page, params, path, queries, hash } = props;
  let url = "";

  if (origin) {
    url += `${forceHttps ? "https" : location.protocol}//${origin}`;
    if (path) {
      if (!path.startsWith("/") && !url.endsWith("/")) url += "/";
      url += path
        .split("/")
        .map(x => encodeURIComponent(x.trim()))
        .join("/");
    }
  } else if (page) {
    url += applyParams(page, params)
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

export function applyParams<T extends CE_Page>(page: T, params?: IPageParams[T]) {
  let p = page as unknown as string;
  params &&
    Object.keys(params).forEach(key => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      p = p.replaceAll(`:${key}`, `${params[key]}`);
    });
  return p;
}

export function parseUrlIfSameOrigin(href: string) {
  // `new URL` may throw an exception
  try {
    const url = new URL(href, document.location.href);
    // Check internal links
    if (url.origin === document.location.origin) {
      return url;
    }
  } catch {}
  return null;
}
