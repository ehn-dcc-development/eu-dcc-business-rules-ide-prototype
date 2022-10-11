import React from "react"
import {createRoot} from "react-dom/client"

import {fileUploadHandler, jsonDownloader} from "./utils/dom"
import {asPrettyJson, parseJson} from "./utils/json"


require("./styling.css")


const storageId = "eu-dcc-business-rules"

const data: unknown = parseJson(localStorage.getItem(storageId))
// TODO  1. validate, and raise an error if it doesn't
//       2. migrate when necessary
//  (This flow should be executed after loading a local file as well.)


const container = document.getElementById("app")
const root = createRoot(container!)
root.render(
    <div>
        <h1>Business rules IDE</h1>
        <div>
            <span>Current data state:</span>
            <pre>{asPrettyJson(data)}</pre>
        </div>
        <div>
            <input
                type="file" id="business-rules" accept=".json"
                onChange={fileUploadHandler((data) => {
                    localStorage.setItem(storageId, data)
                })}
            />
        </div>
        <div>
            <button onClick={jsonDownloader(data, "rules.json")}>Download</button>
        </div>
    </div>
)

