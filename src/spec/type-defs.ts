import {Rule} from "dcc-business-rules-utils"


export type Specification = {
    rules: Rule[]
    ruleTestsById: { [ruleId: string]: RuleTest[] }
}

export const defaultSpecification: Specification = {
    rules: [],
    ruleTestsById: {}
}

export type RuleTestDetails = {
    name?: string
    payload: object
    external: object
    expected: boolean
}

export type RuleTest = {
    id: string
    details: RuleTestDetails
}

