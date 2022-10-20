export const asPrettyJson = (data: unknown): string =>
    JSON.stringify(data, null, 2)

export const asMinimalJson = (data: unknown): string =>
    JSON.stringify(data)

export const parseJson = (text: string | null): SyntaxError | unknown => {
    if (text === null) {
        return null
    }
    try {
        return JSON.parse(text)
    } catch (e: unknown) {
        return e as SyntaxError
    }
}

