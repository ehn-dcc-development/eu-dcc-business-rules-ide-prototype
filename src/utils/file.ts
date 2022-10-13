import React from "react"

import {range} from "./functional"
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


export type FileUpload = {
    name: string
    contents: string
}

export type FileUploadHandler = (fileUploads: FileUpload[]) => void

export const fileUploader = (handle: FileUploadHandler) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const {target} = event
    if (target && target.files) {
        const {files} = target
        Promise.all(
            range(files.length)
                .map((i) => files[i])
                .map((file) =>
                    file.text().then((contents) => Promise.resolve({
                        name: file.name,
                        contents
                    }))
                )
        )
            .then((files) => {
                handle(files)
            })
        // TODO  clear file name; the following doesn't work:
        // event.target.value = ""
    }
}

