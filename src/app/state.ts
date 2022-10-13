import {action, observable} from "mobx"

import {storeData, storedData} from "./persistence"
import {defaultSpecification, Specification} from "../spec/type-defs"
import {asMinimalJson, parseJson} from "../utils/json"


export type IDEState = {
    storageIsMalformed?: boolean
    specification?: Specification
}


export const ideState: IDEState = observable({
    storageIsMalformed: undefined,
    specification: undefined
})

export const storeSpec = () => {
    if (ideState.specification) {
        storeData(asMinimalJson(ideState.specification))
    }
}


export const initializeFromStorage = action(() => {
    const specFromStorage = parseJson(storedData())
    const storageIsMalformed = specFromStorage instanceof SyntaxError
    ideState.storageIsMalformed = storageIsMalformed
    ideState.specification = storageIsMalformed
        ? undefined
        : (specFromStorage === null
                ? defaultSpecification
                : specFromStorage as Specification
        )
})

