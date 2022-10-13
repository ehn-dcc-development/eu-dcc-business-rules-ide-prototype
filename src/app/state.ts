import {Rule} from "dcc-business-rules-utils"
import {action, observable} from "mobx"

import {storeData, storedData} from "./persistence"
import {defaultSpecification, Specification} from "../spec/type-defs"
import {asMinimalJson, parseJson} from "../utils/json"


export type IDEState = {
    storageIsMalformed?: boolean
    specification?: Specification
    saveSpec: (newSpec: Specification) => void
    addRule: (newRule: Rule) => void
}


export const ideState: IDEState = observable({
    storageIsMalformed: undefined,
    specification: undefined,
    // placeholder implementations:
    saveSpec: (_) => {},
    addRule: (_: Rule) => {}
})

const storeSpec = () => {
    storeData(asMinimalJson(ideState.specification))
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
    ideState.saveSpec = (newSpec) => {
        ideState.specification = newSpec
        storeSpec()
    }
    ideState.addRule = (newRule) => {
        ideState.specification!.rules.push(newRule)
        storeSpec()
    }
})

