const storageId = "eu-dcc-business-rules"


export const storedData = () =>
    localStorage.getItem(storageId)

export const storeData = (newData: string) => {
    localStorage.setItem(storageId, newData)
}

export const clearData = () => {
    localStorage.removeItem(storageId)
}

