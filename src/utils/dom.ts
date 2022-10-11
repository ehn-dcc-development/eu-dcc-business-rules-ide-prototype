import React from "react"

import {asPrettyJson} from "./json"


export const jsonDownloader = (data: unknown, name: string) => () => {
    const link = document.createElement("a")
    link.download = name
    link.href = "data:application/json," + encodeURIComponent(asPrettyJson(data))
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    // link is cleaned up automatically (and eventually) after local scope is exited
}


export const fileUploader = (handle: (data: string) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const {target} = event
    if (target && target.files) {
        const {files} = target
        if (files.length > 0) {
            files[0].text().then((newData) => {
                handle(newData)
            })
        }
    }
}

