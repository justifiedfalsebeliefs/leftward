import {getEndpoint, formatParams} from "./config"

export default async function pushNewUserGuid(guid) {
const path = "pushNewUserGuid"

const REST = getEndpoint(path).concat(formatParams("newGuid", guid))

return response = await fetch(REST, { method: 'POST' })
}
