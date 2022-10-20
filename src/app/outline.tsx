import React from "react"
import {observer} from "mobx-react"
import {parseRuleId, Rule} from "dcc-business-rules-utils"

import {runTests, ResultClassification} from "../spec/rule-test"
import {RuleTest, Specification} from "../spec/type-defs"
import {asClassName} from "../utils/css"
import {groupBy, Hash} from "../utils/functional"
import {sortByStringKey} from "../utils/sorting"
import {flagEmoji} from "../utils/string"


export type OutlineProps = {
    specification: Specification,
    selectedRule: Rule | undefined,
    selectRule: (rule: Rule | undefined) => void
}

export const Outline = observer(({specification, selectedRule, selectRule}: OutlineProps) => {
    const rulesPerType = groupBy(
        sortByStringKey(specification.rules, ({Identifier, Version}) => `${Identifier} ${Version}`),
        (rule) => rule.Type
    )

    const SelectableRules = ({rules}: { rules: Rule[] | undefined }) =>
        <div className="rules">
            {(rules || [])
                .map((rule, index) =>
                    <div
                        className={rule === selectedRule ? "selected-rule" : ""}
                        onClick={(_) => {
                            selectRule(rule)
                        }}
                        key={index}
                    >
                        <RuleLine
                            rule={rule}
                            tests={specification.ruleTestsById[rule.Identifier] || []}
                        />
                    </div>
                )
            }
        </div>

    return <div className="outline">
        <div className="header"><span>Acceptance</span></div>
        <SelectableRules rules={rulesPerType["Acceptance"]} />
        <div className="header"><span>Invalidation</span></div>
        <SelectableRules rules={rulesPerType["Invalidation"]} />
    </div>
})


const certificateType2emoji: Hash<string> = {
    "GR": "ᵹ ",
    "RR": "🩹",
    "TR": "🦠",
    "VR": "💉"
}


export type RuleLineProps = {
    rule: Rule
    tests: RuleTest[]
}

export const RuleLine = observer(({rule, tests}: RuleLineProps) => {
    const {country, type} = parseRuleId(rule.Identifier)
    const result = runTests(rule, tests)
    return <div className="rule-line">
        <span className="symbols">{certificateType2emoji[type]} {flagEmoji(country)}</span>
        <span className="identifier">{rule.Identifier}&nbsp;</span>
        <span className="version">{rule.Version}</span>
        <span className={asClassName("test-result", ResultClassification[result])}>&nbsp;</span>
    </div>
})

