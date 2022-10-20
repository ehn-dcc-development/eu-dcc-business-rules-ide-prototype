export const sortArrayBy = <T>(array: T[], keyFunc: (t: T) => number) =>
    [...array]  // (defensive copy)
        .sort((l, r) => keyFunc(l) - keyFunc(r))

export type Comparer<T> = (l: T, r: T) => number

const stringCompare: Comparer<string> = (l, r): number =>
    l === r ? 0 : (l > r ? 1 : -1)

export const stringyCompare = <T>(keyFunc: (t: T) => string): Comparer<T> =>
    (l: T, r: T) => stringCompare(keyFunc(l), keyFunc(r))

export const sortByStringKey = <T>(ts: T[], keyFunc: (t: T) => string) =>
    [...ts].sort(stringyCompare(keyFunc))

