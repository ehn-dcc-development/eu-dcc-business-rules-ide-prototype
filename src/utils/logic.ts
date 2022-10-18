import {CertLogicExpression, evaluate} from "certlogic-js"


export const evaluateExprAgainst = (expr: CertLogicExpression, data: unknown): [result: unknown, erroredOut: boolean] => {
    try {
        return [evaluate(expr, data), false]
    } catch (e: any) {
        return [e.message, true]
    }
}

