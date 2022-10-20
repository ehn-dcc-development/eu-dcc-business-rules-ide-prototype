import {range} from "./functional"


const charCodes = (str: string) =>
    range(str.length).map((index) => str.charCodeAt(index))

export const flagEmoji = (country: string) =>
    String.fromCodePoint(...(
        charCodes(country).map((charCode) => 127397 + charCode)
    ))

