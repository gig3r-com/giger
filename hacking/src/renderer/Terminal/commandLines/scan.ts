const renderData = (data) => (
    `${Object.keys(data).map(key => `<span class="">${key}: <span class="">${data[key]}</span></span>`)}`
)

export const scan = {
    userName: (id) => `${id}`,
    userId: renderData,
    hashId: renderData,
    address: renderData,
}
