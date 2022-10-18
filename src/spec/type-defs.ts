import {Rule} from "dcc-business-rules-utils"


export type Specification = {
    rules: Rule[]
    ruleTestsById: { [ruleId: string]: RuleTest[] }
}

export const defaultSpecification: Specification = {
    rules: [],
    ruleTestsById: {}
}


export type RuleTest = {
    id: string
    details: {
        name?: string
        payload: object
        external: object
        expected: boolean
    }
}

