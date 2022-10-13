import React from "react"
import {Rule} from "dcc-business-rules-utils"
import {action} from "mobx"
import {observer} from "mobx-react"

import {ideState, IDEState, storeSpec} from "./state"
import {Outline} from "../spec/outline"
import {RuleComponent} from "../spec/rule"
import {defaultSpecification, Specification} from "../spec/type-defs"
import {fileUploader, jsonDownloader} from "../utils/file"
import {parseJson} from "../utils/json"


export type IDEProps = {
    state: IDEState
}

export const IDE = observer(({state}: IDEProps) => {
    if (state.specification === undefined) {
        return <>
            <span>Loading...</span>
        </>
    }
    // TODO  show spinner?

    const confirmAndSaveSpec = action((newSpec: Specification) => {
        if (confirm("Are you sure you want to initialize the business rules specification? (You might want to download the current one first.)")) {
            state.specification = newSpec
            storeSpec()
        }
    })

    return <>
        <h1>Business rules IDE</h1>


        <h2>Specification persistence</h2>
        {state.storageIsMalformed &&
            <div><span className="error">Error: persisted business rules specification is erroneous - please upload a valid JSON file.</span></div>}
        <div>
            <span>Destructive actions on business rules specification:</span>
            <ul>
                <li>
                    <label htmlFor="business-rules-spec-file-upload">Upload a business rules specification JSON file (overwriting current specification):&nbsp;</label>
                    <input
                        id="business-rules-spec-file-upload" type="file" accept=".json"
                        onChange={fileUploader((fileUploads) => {
                            if (fileUploads.length > 0) {
                                // ignore all uploads except the first:
                                const newSpec = parseJson(fileUploads[0].contents)
                                if (newSpec instanceof SyntaxError) {
                                    alert(`The uploaded file is not a valid business rules specification JSON file.`)
                                } else {
                                    confirmAndSaveSpec(newSpec as Specification)
                                }
                            }
                        })}
                    />
                </li>
                <li>
                    <span>Download the business rules' specification as a JSON file:&nbsp;</span>
                    <button onClick={jsonDownloader(state.specification, "rules.json")}>Download</button>
                </li>
                <li>
                    <button onClick={() => { confirmAndSaveSpec(defaultSpecification) }}>Initialize</button>
                    <span>&nbsp;business rules specification</span>
                </li>
            </ul>
        </div>


        {state.storageIsMalformed ||
            <>
                <h2>Specification</h2>

                <div>
                    <label htmlFor="import-rule-file-upload">Import a rule:&nbsp;</label>
                    <input
                        id="import-rule-file-upload" type="file" accept=".json" multiple
                        onChange={action(fileUploader((files) => {
                            state.specification!.rules.push(...files.map(({contents}) => parseJson(contents) as Rule))
                            storeSpec()
                        }))}
                    />
                </div>

                <h3>Outline</h3>

                <Outline specification={state.specification} selectedRule={state.selectedRule} selectRule={(rule) => {
                    ideState.selectedRule = rule
                }} />

                {state.selectedRule && <>
                    <h3>Rule</h3>
                    <RuleComponent rule={state.selectedRule} />
                </>}

            </>
        }


        <h2>Colophon</h2>

        <p>
            This IDE has been developed by the <a  href="https://ec.europa.eu/health/ehealth/policy/network_en">European Health Network</a> (eHN),
            as part of the <a href="https://ec.europa.eu/info/live-work-travel-eu/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_en">EU Digital COVID Certificate effort</a>.
        </p>
    </>
})

