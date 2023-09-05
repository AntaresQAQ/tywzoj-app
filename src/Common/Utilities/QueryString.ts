export type IQueryObj = { [key: string]: string | number | boolean };

export function parseQuery<T extends IQueryObj>(qs: string, decode = true): Partial<T> {
    try {
        const rawObj = Object.fromEntries(new URLSearchParams(qs));
        return Object.keys(rawObj).reduce((pre, cur) => {
            const key = cur.trim();
            const rawValue = rawObj[cur].trim();
            let value: string | number | boolean;

            if (rawValue === "null") {
                value = null;
            } else if (rawValue === "true") {
                value = true;
            } else if (rawValue === "false") {
                value = false;
            } else if (!Number.isNaN(Number(rawValue))) {
                value = Number(rawValue);
            } else {
                value = decode ? decodeURIComponent(rawValue).trim() : rawValue;
            }

            return {
                ...pre,
                [key]: value,
            };
        }, {});
    } catch {
        return {};
    }
}

export function toQueryString(obj: IQueryObj): string {
    try {
        return new URLSearchParams(
            Object.keys(obj).reduce((pre, cur) => {
                const val = obj[cur];
                if (val || val === false || val === "") {
                    return {
                        ...pre,
                        [encodeURIComponent(cur.trim())]: encodeURIComponent(val.toString().trim()),
                    };
                } else if (val === null) {
                    return {
                        ...pre,
                        [encodeURIComponent(cur.trim())]: "null",
                    };
                } else {
                    return pre;
                }
            }, {}),
        )
            .toString()
            .trim();
    } catch {
        return "";
    }
}
