import React from "react"
import {observer} from "mobx-react"
import {Rule} from "dcc-business-rules-utils"

import {asPrettyJson} from "../utils/json"


export type RuleComponentProps = {
    rule: Rule
}

export const RuleComponent = observer(({rule}: RuleComponentProps) =>
    <pre>{asPrettyJson(rule)}</pre>
)

