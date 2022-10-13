export const asClassName = (...classNames: (string | false | undefined)[]) =>
    classNames
        .filter((className) => typeof className === "string")
        .join(" ")

