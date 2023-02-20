// https://github.com/maninak/ts-xor
export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PromiseInnerType<T extends Promise<any>> = T extends Promise<infer P> ? P : never;
