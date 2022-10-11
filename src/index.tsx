import React from "react"
import {createRoot} from "react-dom/client"

import {fileUploader, jsonDownloader} from "./utils/dom"
import {asPrettyJson, parseJson} from "./utils/json"


require("./styling.css")


const storageId = "eu-dcc-business-rules"

const dataFromStorage = parseJson(localStorage.getItem(storageId))
// TODO  1. validate, and raise an error if it doesn't
//       2. migrate when necessary
//  (This flow should be executed after loading a local file as well.)
const dataIsEmpty = dataFromStorage === null
// TODO  add a default contents
const dataNotJson = dataFromStorage instanceof SyntaxError
const data = dataNotJson ? {} : dataFromStorage


const container = document.getElementById("app")
const root = createRoot(container!)
root.render(
    <>
        <h1>Business rules IDE</h1>
        <h2>Specification persistence</h2>
        {dataIsEmpty && <div><span>Warning: no business rules specification present - please upload a valid JSON file.</span></div>}
        {dataNotJson && <div><span>Warning: persisted business rules specification is erroneous - please upload a valid JSON file.</span></div>}
        {/* TODO  offer template file | possibility to see and possibly fix the BR JSON contents */}
        <div>
            <label htmlFor="business-rules-file-upload">Upload a business rules specification JSON file{dataIsEmpty || ` (overwriting current one)`}:&nbsp;</label>
            <input
                type="file" id="business-rules-file-upload" accept=".json"
                onChange={fileUploader((newData) => {
                    // TODO  if data from storage is valid, have user confirm overwriting
                    localStorage.setItem(storageId, newData)
                })}
            />
        </div>
        <div>
            <button onClick={() => {
                localStorage.removeItem(storageId)
            }}>Clear local storage</button>
            <span>(for development purposes only)</span>
        </div>
        {(dataIsEmpty || dataNotJson) ||
            <>
                <div>
                    <span>Download the business rules' specification as a JSON file:&nbsp;</span>
                    <button
                        onClick={jsonDownloader(data, "rules.json")}>Download
                    </button>
                </div>
                <div>
                    <span>Current business rules specification:</span>
                    <pre>{asPrettyJson(data)}</pre>
                </div>
            </>
        }
        <h2>Colophon</h2>
        <p>
            This IDE has been developed by the <a href="https://ec.europa.eu/health/ehealth/policy/network_en">European Health Network</a> (eHN), as part of the <a href="https://ec.europa.eu/info/live-work-travel-eu/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_en">EU Digital COVID Certificate effort</a>.
        </p>
    </>
)

