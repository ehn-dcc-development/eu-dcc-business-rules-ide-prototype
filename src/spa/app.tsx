import React, {useState} from "react"
import {Rule} from "dcc-business-rules-utils"

import {fileUploader, jsonDownloader} from "../utils/dom"
import {asMinimalJson, asPrettyJson, parseJson} from "../utils/json"
import {storeData, storedData} from "./persistence"
import {defaultSpecification, Specification} from "../spec/type-defs"


export const App = () => {
    // use a React hook to make the app reactive in stored data:
    const [specFromStorage, setSpecInStorage] = useState(parseJson(storedData()))

    // TODO  1. validate, and raise an error if it doesn't
    //       2. migrate when necessary
    //  (This flow should be executed after loading a local file as well.)
    const specFromStorageNotJson = specFromStorage instanceof SyntaxError
    const specification: Specification = (specFromStorageNotJson || specFromStorage !== null)
        ? (specFromStorage as Specification)
        : defaultSpecification
    const saveSpec = (newSpec: Specification) => {
        storeData(asMinimalJson(newSpec))
        setSpecInStorage(newSpec)
    }
    const addRule = (newRule: Rule) => {
        specification.rules.push(newRule)
        setSpecInStorage((prevSpec: Specification) => ({
            rules: [...prevSpec.rules, newRule]
        }))
    }

    return <>
        <h1>Business rules IDE</h1>

        <h2>Specification persistence</h2>
        {specFromStorageNotJson &&
            <div><span className="error">Error: persisted business rules specification is erroneous - please upload a valid JSON file.</span></div>}
        {/* TODO  add possibility to see and possibly fix the BR JSON contents */}
        <div>
            <span>Destructive actions on business rules specification:</span>
            <ul>
                <li>
                    <label htmlFor="business-rules-file-upload">Upload a business rules specification JSON file (overwriting current specification):&nbsp;</label>
                    <input
                        type="file" id="business-rules-file-upload" accept=".json"
                        onChange={fileUploader((name, newData, index) => {
                            if (index === 0) {  // ignore all uploads except the first
                                // TODO  if data from storage is valid, have user confirm overwriting
                                saveSpec(parseJson(newData) as Specification)
                            }
                        })}
                    />
                </li>
                <li>
                    <button onClick={() => {
                        if (confirm("Are you sure you want to initialize the business rules specification? (You might want to download the current one first.)")) {
                            saveSpec(defaultSpecification)
                        }
                    }}>Initialize</button>
                    <span>&nbsp;business rules specification</span>
                </li>
            </ul>
        </div>


        {specFromStorageNotJson ||
            <>
                <h2>Import</h2>

                <div>
                    <label htmlFor="import-file-upload">Upload a </label>
                    <input
                        type="file" id="import-file-upload" accept=".json" //multiple
                        onChange={fileUploader((name, newData) => {
                            addRule(parseJson(newData) as Rule)
                        })}
                    />
                </div>


                <h2>Specification</h2>

                <div>
                    <span>Download the business rules' specification as a JSON file:&nbsp;</span>
                    <button onClick={jsonDownloader(specification, "rules.json")}>Download</button>
                </div>
                <div>
                    <span>Current business rules specification:</span>
                    <pre>{asPrettyJson(specification)}</pre>
                </div>
            </>
        }


        <h2>Colophon</h2>

        <p>
            This IDE has been developed by the <a  href="https://ec.europa.eu/health/ehealth/policy/network_en">European Health Network</a> (eHN),
            as part of the <a href="https://ec.europa.eu/info/live-work-travel-eu/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_en">EU Digital COVID Certificate effort</a>.
        </p>
    </>
}

