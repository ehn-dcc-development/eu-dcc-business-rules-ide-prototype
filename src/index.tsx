import React from "react"
import {createRoot} from "react-dom/client"

import {IDE} from "./app/ide"
import {ideState, initializeFromStorage} from "./app/state"


require("./styling.css")


initializeFromStorage()
// migrate:
const {specification} = ideState
if (specification !== undefined && specification.ruleTestsById === undefined) {
    specification.ruleTestsById = {}
    specification.rules.forEach(({Identifier}) => {
        if (!(Identifier in specification.ruleTestsById)) {
            specification.ruleTestsById[Identifier] = []
        }
    })
}

const container = document.getElementById("ide")
const root = createRoot(container!)
root.render(<IDE state={ideState} />)

