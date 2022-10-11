import {Rule} from "dcc-business-rules-utils"


export type Specification = {
    rules: Rule[]
}

export const defaultSpecification: Specification = {
    rules: []
}

