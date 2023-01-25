export type IQueryObj = { [key: string]: string | number | boolean };

export function parseQuery(qs: string): IQueryObj {
  try {
    const rawObj = Object.fromEntries(new URLSearchParams(qs));
    return Object.keys(rawObj).reduce((pre, cur) => {
      const key = cur.trim();
      const rawValue = rawObj[cur].trim();
      let value: string | number | boolean;

      if (rawValue === "true") {
        value = true;
      } else if (rawValue === "false") {
        value = false;
      } else if (!Number.isNaN(Number(rawValue))) {
        value = Number(rawValue);
      } else {
        value = rawValue;
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
      Object.keys(obj).reduce(
        (pre, cur) => ({
          ...pre,
          [cur.trim()]: obj[cur].toString().trim(),
        }),
        {},
      ),
    )
      .toString()
      .trim();
  } catch {
    return "";
  }
}
