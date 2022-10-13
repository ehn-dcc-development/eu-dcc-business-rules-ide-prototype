import React from "react"
import {Rule} from "dcc-business-rules-utils"
import {action} from "mobx"
import {observer} from "mobx-react"

import {IDEState, storeSpec} from "./state"
import {defaultSpecification, Specification} from "../spec/type-defs"
import {fileUploader, jsonDownloader} from "../utils/dom"
import {asPrettyJson, parseJson} from "../utils/json"


export const IDE = observer(({ state }: { state: IDEState }) => {
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
                    <label htmlFor="business-rules-file-upload">Upload a business rules specification JSON file (overwriting current specification):&nbsp;</label>
                    <input
                        type="file" id="business-rules-file-upload" accept=".json"
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
                    <button onClick={() => { confirmAndSaveSpec(defaultSpecification) }}>Initialize</button>
                    <span>&nbsp;business rules specification</span>
                </li>
            </ul>
        </div>


        {state.storageIsMalformed ||
            <>
                <h2>Import</h2>

                <div>
                    <label htmlFor="import-file-upload">Upload a </label>
                    <input
                        type="file" id="import-file-upload" accept=".json" multiple
                        onChange={action(fileUploader((files) => {
                            state.specification!.rules.push(...files.map(({ contents }) => parseJson(contents) as Rule))
                            storeSpec()
                        }))}
                    />
                </div>


                <h2>Specification</h2>

                <div>
                    <span>Download the business rules' specification as a JSON file:&nbsp;</span>
                    <button onClick={jsonDownloader(state.specification, "rules.json")}>Download</button>
                </div>
                <div>
                    <span>Current business rules specification:</span>
                    <pre>{asPrettyJson(state.specification)}</pre>
                </div>
            </>
        }


        <h2>Colophon</h2>

        <p>
            This IDE has been developed by the <a  href="https://ec.europa.eu/health/ehealth/policy/network_en">European Health Network</a> (eHN),
            as part of the <a href="https://ec.europa.eu/info/live-work-travel-eu/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_en">EU Digital COVID Certificate effort</a>.
        </p>
    </>
})

