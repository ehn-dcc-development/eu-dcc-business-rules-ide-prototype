import React from "react"
import {observer} from "mobx-react"
import {Rule} from "dcc-business-rules-utils"

import {ResultClassification, runTest} from "../spec/rule-test"
import {RuleTest} from "../spec/type-defs"
import {asClassName} from "../utils/css"


export type RuleTestComponentProps = {
    rule: Rule
    test: RuleTest
}

export const RuleTestComponent = observer(({rule, test}: RuleTestComponentProps) => {
    const {id, details} = test
    const {name, expected} = details
    const [actual, classification] = runTest(rule, test)
    return <tr className={asClassName("test-result", ResultClassification[classification])}>
        <td>{id}</td>
        <td>{name}</td>
        <td><span className="tt">{"" + expected}</span></td>
        <td>{classification === ResultClassification.error ? `error` : <span className="tt">{"" + actual}</span>}</td>
    </tr>
})

