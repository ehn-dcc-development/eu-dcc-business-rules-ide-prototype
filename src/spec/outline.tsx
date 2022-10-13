import React from "react"
import {observer} from "mobx-react"
import {parseRuleId, Rule} from "dcc-business-rules-utils"

import {Specification} from "./type-defs"
import {asClassName} from "../utils/css"
import {groupBy, Hash} from "../utils/functional"
import {flagEmoji} from "../utils/string"


export type OutlineProps = {
    specification: Specification,
    selectedRule: Rule | undefined,
    selectRule: (rule: Rule | undefined) => void
}

export const Outline = observer(({specification, selectedRule, selectRule}: OutlineProps) => {
    const rulesPerType = groupBy(
        specification.rules,    // TODO  sort on (ID, version)
        (rule) => rule.Type
    )

    return <div className="outline">
        <div className="header"><span>Acceptance</span></div>
        <div className="rules">
            {(rulesPerType["Acceptance"] || [])
                .map((rule, index) =>
                    <RuleInOutline rule={rule} isSelected={rule === selectedRule} select={() => {
                        selectRule(rule)
                    }} key={index} />)
            }
        </div>
        <div className="header"><span>Invalidation</span></div>
        <div className="rules">
            {(rulesPerType["Invalidation"] || [])
                .map((rule, index) =>
                    <RuleInOutline rule={rule} isSelected={rule === selectedRule} select={() => {
                        selectRule(rule)
                    }} key={index} />)
            }
        </div>
    </div>
})


const certificateType2emoji: Hash<string> = {
    "GR": "ᵹ ",
    "RR": "🩹",
    "TR": "🦠",
    "VR": "💉"
}


type RuleInOutlineProps = {
    rule: Rule,
    isSelected: boolean,
    select: () => void
}

const RuleInOutline = observer(({rule, isSelected, select}: RuleInOutlineProps) => {
    const {country, type} = parseRuleId(rule.Identifier)
    return <div className={asClassName("rule", isSelected && "selected")} onClick={(_) => {
        select()
    }}>
        <span className="symbols">{certificateType2emoji[type]} {flagEmoji(country)}</span>
        <span className="identifier">{rule.Identifier}&nbsp;</span>
        <span className="version">{rule.Version}</span>
    </div>
})

