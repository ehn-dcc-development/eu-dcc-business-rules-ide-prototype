export const asPrettyJson = (data: unknown): string =>
    JSON.stringify(data, null, 2)


export const parseJson = (text: string | null): unknown =>
    text === null ? null : JSON.parse(text)

