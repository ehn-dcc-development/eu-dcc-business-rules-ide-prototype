import React from "react"
import {observer} from "mobx-react"
import {CompactExprRendering} from "certlogic-html"
import {Rule} from "dcc-business-rules-utils"

import {RuleLine} from "./outline"


require("./Certlogic-styling.css")


export type RuleComponentProps = {
    rule: Rule
}

export const RuleComponent = observer(({rule}: RuleComponentProps) =>
    <div className="rule">
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
                {rule.Description.map((desc, index) =>
                    <tr>
                        <td>{desc.lang}</td>
                        <td>{desc.desc}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
)

