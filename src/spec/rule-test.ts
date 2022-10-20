import {CertLogicExpression, evaluate} from "certlogic-js"
import {Rule} from "dcc-business-rules-utils"

import {RuleTest} from "./type-defs"


export const evaluateExprAgainst = (expr: CertLogicExpression, data: unknown): [result: unknown, erroredOut: boolean] => {
    try {
        return [evaluate(expr, data), false]
    } catch (e: any) {
        return [e.message, true]
    }
}


export enum ResultClassification {
    success,
    failure,
    error,
    noTests
}

const combine = (left: ResultClassification, right: ResultClassification): ResultClassification => {
    switch (left) {
        case ResultClassification.success:
            return right
        case ResultClassification.failure:
            return right === ResultClassification.error
                ? ResultClassification.error
                : ResultClassification.failure
        case ResultClassification.error:
            return ResultClassification.error
        case ResultClassification.noTests:
            return right
    }
}


export const runTest = ({Logic}: Rule, {details}: RuleTest): [actual: unknown, classification: ResultClassification] => {
    const {payload, external, expected} = details
    const [actual, erroredOut] = evaluateExprAgainst(Logic, { payload, external })
    return [
        actual,
        erroredOut
            ? ResultClassification.error
            : (
                actual === expected
                    ? ResultClassification.success
                    : ResultClassification.failure
            )
    ]
}


export const runTests = (rule: Rule, tests: RuleTest[]): ResultClassification =>
    tests
        .map((test) => runTest(rule, test)[1])
        .reduce(combine, ResultClassification.noTests)

