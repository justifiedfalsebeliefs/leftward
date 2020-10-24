import {getEndpoint, formatParams} from "./config"

export default async function pushCalcExp(guid) {
const path = "pushCalcExp"

const REST = getEndpoint(path).concat(formatParams("userGuid", guid))

return response = await fetch(REST, { method: 'POST' })
}
