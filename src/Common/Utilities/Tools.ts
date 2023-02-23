/* eslint-disable @typescript-eslint/no-explicit-any */
export function runOnce<T extends (...args: any[]) => any>(cb: T) {
  let initialized = false;
  let res: ReturnType<T>;

  const returnFunc = (...args: Parameters<T>): ReturnType<T> => {
    if (initialized) {
      return res;
    }
    initialized = true;

    return (res = cb(...args));
  };

  returnFunc.reset = function () {
    initialized = false;
    res = null;
  };

  return returnFunc;
}

export function memo<T extends string | number, R>(cb: (key: T) => R, expiration?: number) {
  const memoMap: Record<T, R> = {} as any;
  const timeOutMap: Record<T, number> = {} as any;

  return (key: T): R => {
    if (memoMap[key] !== undefined) {
      return memoMap[key];
    }

    const result = cb(key);

    if (expiration) {
      if (timeOutMap[key]) {
        clearTimeout(timeOutMap[key]);
      }
      timeOutMap[key] = setTimeout(() => {
        delete memoMap[key];
        delete timeOutMap[key];
      }, expiration);
    }
    memoMap[key] = result;

    return result;
  };
}
