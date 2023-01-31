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

export function memo<T extends (key: string | number) => any>(cb: T) {
  const memoMap: Record<string, ReturnType<T>> = {};

  return (key: string): ReturnType<T> => {
    if (memoMap[key] !== undefined) {
      return memoMap[key];
    }

    return (memoMap[key] = cb(key));
  };
}
