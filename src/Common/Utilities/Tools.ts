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
    const memoMap: Record<T, { value: R; time: number }> = {} as any;

    return (key: T): R => {
        let result = memoMap[key];

        if (result && (!expiration || result.time + expiration >= Date.now())) {
            return result.value;
        }

        result = { time: Date.now(), value: cb(key) };
        memoMap[key] = result;

        return result.value;
    };
}
