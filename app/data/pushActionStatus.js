import {getEndpoint, formatParams} from "./config"

export default async function pushActionStatus(guid, status, actionId) {
const path = "pushActionStatus"

const REST = getEndpoint(path)
.concat(formatParams("userGuid", guid))
.concat(formatParams("statusUpdate", status))
.concat(formatParams("actionId", actionId.toString()))

return response = await fetch(REST, { method: 'POST' })
}
