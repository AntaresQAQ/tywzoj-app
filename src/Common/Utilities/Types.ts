// https://github.com/maninak/ts-xor
export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PromiseInnerType<T extends Promise<any>> = T extends Promise<infer P> ? P : never;

// https://stackoverflow.com/questions/40510611/typescript-interface-require-one-of-two-properties-to-exist
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
    {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
    }[Keys];

export type StringifyValues<T extends object> = { [K in keyof T]: string };

export type HttpPatch<T extends { id: number }> = Partial<Omit<T, "id">>;
