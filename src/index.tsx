import React from "react"
import {createRoot} from "react-dom/client"

import {IDE} from "./app/ide"
import {ideState, initializeFromStorage} from "./app/state"


require("./styling.css")


initializeFromStorage()

const container = document.getElementById("ide")
const root = createRoot(container!)
root.render(<IDE state={ideState} />)

