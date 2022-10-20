/**
 * Generates an integer range 0..(n-1).
 * @param n - the length of the integer range
 * @returns {number[]}
 */
export const range = (n: number): number[] =>
    [...Array(n).keys()]


export type Hash<V> = { [key: string]: V }

export const groupBy = <T>(array: T[], keyFunc: (t: T) => string): Hash<T[]> =>
    array.reduce((acc: Hash<T[]>, value) => {
        const key = keyFunc(value)
        if (acc[key] === undefined) {
            acc[key] = []
        }
        acc[key].push(value)
        return acc
    }, {})

