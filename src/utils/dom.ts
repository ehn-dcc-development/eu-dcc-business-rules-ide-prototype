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


export type FileUploadHandler = (name: string, data: string, index: number) => void

export const fileUploader = (handle: FileUploadHandler/*, finish?: () => void*/) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const {target} = event
    if (target && target.files) {
        const {files} = target
        if (files.length > 0) {
            files[0].text().then((contents) => {
                handle(files[0].name, contents, 0)
            })
        }
        // TODO  make multi-upload work again
        /*
        -- attempt to handle multiple files at once - doesn't trigger re-rendering properly --:
        Promise.all(
            [...Array(files.length).keys()]
                .map((i) => files[i])
                .map((file, i) =>
                    file.text().then((contents) => {
                        handle(file.name, contents, i)
                    })
                )
        ).then(() => {
            if (finish) {
                finish()
            }
        })
         */
        // TODO  clear file name; the following doesn't work:
        // event.target.value = ""
    }
}

