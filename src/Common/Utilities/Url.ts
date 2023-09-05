import { CE_Page } from "@/Common/Enums/PagePath";
import { IPageParams, IParam } from "@/Common/Types/PageParams";
import { IQueryObj, toQueryString } from "@/Common/Utilities/QueryString";
import { RequireAtLeastOne, XOR } from "@/Common/Utilities/Types";

type IPage<T extends CE_Page> = {
    page: T;
    params?: IPageParams[T];
};

type IOrigin = RequireAtLeastOne<
    {
        origin?: string;
        path?: string;
        forceHttps?: boolean;
    },
    "origin" | "path"
>;

type IMakeUrlProps<T extends CE_Page> = XOR<IOrigin, IPage<T>> & {
    queries?: IQueryObj;
    hash?: string;
};

export function makeUrl<T extends CE_Page>(props: IMakeUrlProps<T>) {
    const { origin, forceHttps, page, params, path, queries, hash } = props;
    let url = "";

    if (page) {
        url += applyParams(page, params);
    } else if (origin || path) {
        if (origin) {
            url += `${forceHttps ? "https" : location.protocol}//${origin}`;
        }
        if (path) {
            if (!path.startsWith("/") && !url.endsWith("/")) url += "/";
            url += path
                .split("/")
                .map((x) => encodeURIComponent(x.trim()))
                .join("/");
        }
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

export function applyParams(page: string, params?: IParam) {
    params &&
        Object.keys(params).forEach((key) => {
            page = page.replaceAll(`:${key}`, encodeURIComponent(`${params[key]}`.trim()));
        });
    return page;
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
