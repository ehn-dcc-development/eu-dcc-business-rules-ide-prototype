import React from "react"
import {action} from "mobx"
import {observer} from "mobx-react"
import {CompactExprRendering} from "certlogic-html"
import {Rule} from "dcc-business-rules-utils"

import {RuleLine} from "./outline"
import {RuleTest} from "./type-defs"
import {ideState, storeSpec} from "../app/state"
import {fileUploader, withoutFileExtension} from "../utils/file"
import {parseJson} from "../utils/json"
import {evaluateExprAgainst} from "../utils/logic"


require("certlogic-html/dist/styling.css")


export type RuleComponentProps = {
    rule: Rule
}

export const RuleComponent = observer(({rule}: RuleComponentProps) => {
    const {ruleTestsById} = ideState.specification!

    return <div className="rule">
        <div>
            <span>identification:&nbsp;</span>
            <RuleLine rule={rule} />
        </div>
        <div>
            <span>{`valid: ${rule.ValidFrom} - ${rule.ValidTo}`}</span>
        </div>
        <div>
            <span>DCC schema:&nbsp;</span>
            <span className="version">{rule.SchemaVersion}</span>
        </div>
        <div>
            <span>engine:&nbsp;</span>
            <span>{rule.Engine}&nbsp;</span>
            <span className="version">{rule.EngineVersion}</span>
        </div>
        <div>
            <span>logic:&nbsp;</span>
            <CompactExprRendering expr={rule.Logic} />
        </div>
        <div>
            <span>accessed fields:&nbsp;</span>
            <span className="tt">{rule.AffectedFields.join(", ")}</span>
        </div>
        <table>
            <thead>
                <tr>
                    <th>lang</th>
                    <th>description</th>
                </tr>
            </thead>
            <tbody>
                {rule.Description.map((desc) =>
                    <tr key={desc.lang}>
                        <td>{desc.lang}</td>
                        <td>{desc.desc}</td>
                    </tr>
                )}
            </tbody>
        </table>

        <h4>Tests</h4>
        <div>
            <label htmlFor="import-rule-test-file-upload">Import rule tests:&nbsp;</label>
            <input
                id="import-rule-test-file-upload" type="file" accept=".json" multiple
                onChange={action(fileUploader((files) => {
                    let ruleTests = ruleTestsById[rule.Identifier]
                    if (ruleTests === undefined) {
                        ruleTestsById[rule.Identifier] = ruleTests = []
                    }
                    ruleTests.push(...files.map(({name, contents}) => ({
                        id: withoutFileExtension(name),
                        details: parseJson(contents)
                            // TODO  verify cast
                    } as RuleTest)))
                    storeSpec()
                }))}
            />
        </div>
        <table>
            <thead>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>expected</th>
                <th>actual</th>
            </tr>
            </thead>
            <tbody>
            {(ruleTestsById[rule.Identifier] || []).map(({id, details}, index) => {
                const {name, payload, external, expected} = details
                const [actual, erroredOut] = evaluateExprAgainst(rule.Logic, { payload, external })
                const matches = !erroredOut && actual === expected
                const backgroundColor = erroredOut
                    ? "darkred"
                    : (matches ? "lightgreen" : "red")
                return <tr key={index} style={{ backgroundColor }}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td><span className="tt">{"" + expected}</span></td>
                    <td>{erroredOut ? `error` : <span className="tt">{"" + actual}</span>}</td>
                </tr>
            })}
            </tbody>
        </table>
        <div>
            <button onClick={() => {
                ruleTestsById[rule.Identifier] = []
                storeSpec()
            }}>Remove</button>
            <span>&nbsp;all tests</span>
        </div>

    </div>
})


// "\u2705", "\u274C"

